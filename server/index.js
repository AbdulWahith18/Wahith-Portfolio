import express from 'express'
import multer from 'multer'
import { PDFParse } from 'pdf-parse'
import path from "path"
import { fileURLToPath } from "url"

const app = express()
const PORT = process.env.PORT || 5000

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})

const SKILL_KEYWORDS = [
  { skill: 'JavaScript', patterns: [/\bjavascript\b/, /\bjs\b/] },
  { skill: 'TypeScript', patterns: [/\btypescript\b/, /\bts\b/] },
  { skill: 'React', patterns: [/\breact\b/, /\breactjs\b/] },
  { skill: 'Node.js', patterns: [/\bnode\b/, /\bnode\.js\b/, /\bnodejs\b/] },
  { skill: 'Express.js', patterns: [/\bexpress\b/, /\bexpress\.js\b/] },
  { skill: 'Java', patterns: [/\bjava\b/] },
  { skill: 'Python', patterns: [/\bpython\b/] },
  { skill: 'C', patterns: [/\bc\b/] },
  { skill: 'C++', patterns: [/\bc\+\+\b/] },
  { skill: 'SQL', patterns: [/\bsql\b/, /\bmysql\b/, /\bpostgresql\b/, /\bpostgres\b/] },
  { skill: 'MongoDB', patterns: [/\bmongodb\b/, /\bmongo\b/] },
  { skill: 'REST API', patterns: [/\brest\b/, /\bapi\b/] },
  { skill: 'HTML', patterns: [/\bhtml\b/] },
  { skill: 'CSS', patterns: [/\bcss\b/] },
  { skill: 'Git', patterns: [/\bgit\b/, /\bgithub\b/] },
  { skill: 'Docker', patterns: [/\bdocker\b/] },
  { skill: 'AWS', patterns: [/\baws\b/, /\bamazon web services\b/] },
  { skill: 'DSA', patterns: [/\bdata structures\b/, /\balgorithms\b/, /\bdsa\b/] },
  { skill: 'Problem Solving', patterns: [/\bproblem solving\b/] },
]

const REQUIREMENT_WEIGHTS = {
  mustHave: 3,
  standard: 2,
  optional: 1,
}

const MUST_HAVE_CUES = [
  /\bmust\b/,
  /\brequired\b/,
  /\bmandatory\b/,
  /\bminimum\b/,
  /\bneed to\b/,
  /\bshould have\b/,
]

const OPTIONAL_CUES = [/\bpreferred\b/, /\bnice to have\b/, /\bgood to have\b/, /\bplus\b/, /\bbonus\b/]

const getRequirementPriority = (sentence) => {
  if (MUST_HAVE_CUES.some((pattern) => pattern.test(sentence))) {
    return 'mustHave'
  }

  if (OPTIONAL_CUES.some((pattern) => pattern.test(sentence))) {
    return 'optional'
  }

  return 'standard'
}

const comparePriority = (currentPriority, nextPriority) =>
  REQUIREMENT_WEIGHTS[nextPriority] > REQUIREMENT_WEIGHTS[currentPriority]

const extractSkillsFromText = (text) =>
  SKILL_KEYWORDS.filter((entry) => entry.patterns.some((pattern) => pattern.test(text))).map(
    (entry) => entry.skill,
  )

const extractWeightedRequirements = (jobDescriptionText) => {
  const sentences = jobDescriptionText
    .split(/[\n.!?;:]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)

  const requirementMap = new Map()

  sentences.forEach((sentence) => {
    const sentencePriority = getRequirementPriority(sentence)

    SKILL_KEYWORDS.forEach((entry) => {
      const existsInSentence = entry.patterns.some((pattern) => pattern.test(sentence))

      if (!existsInSentence) {
        return
      }

      const existingPriority = requirementMap.get(entry.skill)

      if (!existingPriority || comparePriority(existingPriority, sentencePriority)) {
        requirementMap.set(entry.skill, sentencePriority)
      }
    })
  })

  return Array.from(requirementMap.entries()).map(([skill, priority]) => ({
    skill,
    priority,
    weight: REQUIREMENT_WEIGHTS[priority],
  }))
}

const extractTextFromPdfBuffer = async (buffer) => {
  const parser = new PDFParse({ data: buffer })
  const textResult = await parser.getText()
  await parser.destroy()
  return (textResult.text || '').toLowerCase()
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post(
  '/api/resume-match',
  upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'jobDescription', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const resumeFile = req.files?.resume?.[0]
      const jobDescriptionFile = req.files?.jobDescription?.[0]

      if (!resumeFile || !jobDescriptionFile) {
        return res.status(400).json({
          error: 'Upload both Resume PDF and Job Description PDF.',
        })
      }

      const [resumeText, jdText] = await Promise.all([
        extractTextFromPdfBuffer(resumeFile.buffer),
        extractTextFromPdfBuffer(jobDescriptionFile.buffer),
      ])

      const weightedRequirements = extractWeightedRequirements(jdText)
      const resumeSkills = extractSkillsFromText(resumeText)
      const resumeSkillSet = new Set(resumeSkills)

      if (weightedRequirements.length === 0) {
        return res.json({
          score: 0,
          matchedSkills: [],
          missingSkills: [],
          missingMustHaveSkills: [],
          missingOptionalSkills: [],
          note: 'No known skills were detected in the uploaded job description PDF.',
        })
      }

      const matchedRequirements = weightedRequirements.filter((requirement) =>
        resumeSkillSet.has(requirement.skill),
      )
      const missingRequirements = weightedRequirements.filter(
        (requirement) => !resumeSkillSet.has(requirement.skill),
      )
      const totalWeight = weightedRequirements.reduce((sum, requirement) => sum + requirement.weight, 0)
      const matchedWeight = matchedRequirements.reduce((sum, requirement) => sum + requirement.weight, 0)
      const score = Math.round((matchedWeight / totalWeight) * 100)

      const missingMustHaveSkills = missingRequirements
        .filter((requirement) => requirement.priority === 'mustHave')
        .map((requirement) => requirement.skill)
      const missingOptionalSkills = missingRequirements
        .filter((requirement) => requirement.priority === 'optional')
        .map((requirement) => requirement.skill)
      const missingSkills = missingRequirements
        .filter((requirement) => requirement.priority === 'standard')
        .map((requirement) => requirement.skill)
      const matchedSkills = matchedRequirements.map((requirement) => requirement.skill)

      return res.json({
        score,
        matchedSkills,
        missingSkills,
        missingMustHaveSkills,
        missingOptionalSkills,
        note: '',
      })
    } catch (_error) {
      return res.status(500).json({
        error: 'Could not analyze one or both PDFs. Try with text-based PDF files.',
      })
    }
  },
)
// ===== SERVE FRONTEND (VITE DIST) =====

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(__dirname))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.listen(PORT, () => {
  console.log(`Resume backend listening on port ${PORT}`)
})