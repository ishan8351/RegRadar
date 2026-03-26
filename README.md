# RegRadar

**Deterministic Infrastructure Compliance.**

The regulatory landscape outpaces human engineering capacity. RegRadar is an AI-driven Regulatory Intelligence Agent that bridges the gap between dense legal frameworks (EU AI Act, DORA, SEC rulings) and Infrastructure-as-Code (IaC). We eliminate the manual translation layer between legal mandates and cloud configurations.

While traditional tools generate static compliance reports, RegRadar autonomously writes the code to fix your infrastructure.

---

## The Problem: The Translation Gap

The current pipeline from regulatory publication to infrastructure update is fundamentally broken:
1. Manual review of extensive legal documentation.
2. Subjective mapping of legal concepts to technical requirements by consultants.
3. Creation of massive, unprioritized engineering backlogs.
4. Manual developer remediation across legacy infrastructure.

By the time an enterprise updates its infrastructure to comply with a new regulation, a newer regulation has already passed, or a fine has been levied. This manual workflow is obsolete.

## The Solution: Execution, Not Advisory

RegRadar is not a suggestion engine. It is a deterministic pipeline that converts ambiguous legal text into precise cloud infrastructure updates. 

### Core Workflow
1. **Legal Ingestion (Amazon Bedrock):** RegRadar parses complex regulatory documents using high-context LLMs, outputting a strictly typed JSON schema of technical mandates.
2. **Human-in-the-Loop Validation:** Compliance teams review and approve the extracted mandates via UI. This enforces strict liability boundaries—AI extracts the logic, but humans authorize the scan.
3. **Targeted IaC Scanning:** RegRadar connects to your repositories and scans deterministic state files (Terraform `.tf`, Kubernetes manifests). We ignore application code entirely to guarantee zero false positives.
4. **Auto-Remediation:** The engine cross-references the validated JSON ruleset against your IaC state and autonomously generates configuration-only Pull Requests (e.g., enforcing KMS encryption on an S3 bucket). 

---

## Architecture & AWS Integration

RegRadar relies on native AWS services to ensure enterprise-grade security and execution capability.

* **Amazon Bedrock:** Powers the legal extraction engine. By utilizing Bedrock, we ensure proprietary compliance data and strategy are never exposed to public LLM endpoints.
* **Amazon VPC:** RegRadar operates entirely within the client's Virtual Private Cloud. It is a true Zero-Trust deployment. Source code and infrastructure state never traverse the public internet.
* **AWS KMS & IAM:** The primary targets of our remediation engine. RegRadar enforces strict access boundaries and encryption-at-rest protocols directly at the AWS configuration level.

---

## Development Setup

### Prerequisites
* Node.js (v18+)
* npm or yarn
* Valid AWS Credentials with access to Amazon Bedrock

### Installation

1. Clone the repository:
```bash
git clone [https://github.com/your-org/regradar.git](https://github.com/your-org/regradar.git)
cd regradar
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory and define your secure variables.
```bash
VITE_AWS_REGION=us-east-1
# DO NOT commit actual credentials to version control.
```

4. Start the development server:
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## License
Proprietary. All rights reserved.


