# PetStore Workflow — Node/Express + IA (Copilot Agent) + MCP

## Objectif
Montrer un workflow de développement assisté par IA centré sur : harnais de tests, règles (`AGENS.md`), Git/PR/review, lecture d’issue via MCP, et qualité des prompts.

## Démarrage
```bash
npm install
npm test      # 1 test rouge au départ (POST /pets manquant)
npm run dev   # API sur http://localhost:3000
```
Endpoints initiaux (partiels) :
- `GET /pets?limit=`
- `GET /pets/:id`
- `POST /pets` (à implémenter)
- plus tard : `GET /pets?tag=` (filtre) et `PATCH /pets/:id`

## Branches recommandées
- `feat/post-pets`, `refactor/validation`, `feat/filter-tag`, `feat/patch-pet`.

## MCP
Prévoir Copilot Agent relié à GitHub. À défaut, copier le texte de l’issue dans le prompt.

## Évaluation (process)
Tests, respect `AGENTS.md`, discipline Git/PR, usage MCP (lecture issue), esprit critique dans la PR.
