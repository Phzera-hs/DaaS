# 🧭 Skill: Contexto Global do Projeto — DaaS (Data as a Storytelling)

> **Propósito desta Skill:** Fornecer autonomia completa e contextualização 360° para qualquer agente de IA que atue neste repositório. Este documento serve como **ponto único de entrada (Single Source of Truth)** para compreensão do projeto, seus diferenciais, arquitetura, estado de desenvolvimento, regras mandatórias e direcionamento para subskills e agentes especializados.

---

## 1. 📌 Visão e Ideia Central do Projeto

### 1.1 O que é o DaaS?
**DaaS (Data as a Storytelling)** — anteriormente referenciado como **DataForge** — é uma plataforma nativa de inteligência artificial voltada para a **geração de ecossistemas de datasets relacionais sintéticos realistas**.

Em vez de gerar tabelas aleatórias e isoladas ou forçar o download de datasets estáticos e datados, o DaaS permite que o usuário crie ecossistemas de negócios inteiros a partir de **prompts em linguagem natural** guiados por **storytelling de negócios**.

### 1.2 Diferenciais Centrais
1. **Storytelling-First:** A geração é pautada em narrativas e regras corporativas reais (ex: *"Fintech brasileira com pessoas físicas e jurídicas, transações Pix, cartões de crédito, eventos de fraude e cobrança de inadimplência"*).
2. **Inteligência Relacional:** As tabelas geradas mantêm integridade referencial estrita (Primary Keys e Foreign Keys), consistência temporal de eventos e distribuições de domínio realistas.
3. **Dirty Engine (Motor de Dados Sujos):** Permite simular com precisão cirúrgica a qualidade de dados encontrada em ambientes corporativos reais, dividido em 4 níveis:
   - `CLEAN`: Dados analiticamente perfeitos, padronizados e sem anomalias.
   - `ANALYTICS`: Pequenas imperfeições analíticas (ex: outliers sutis, variações de digitação).
   - `ENGINEERING`: Inconsistências de pipelines e transientes (ex: nulos inesperados, falhas parciais de schema).
   - `CHAOS`: Alta corrupção proposital (ex: injeção massiva de NULLs, chaves estrangeiras órfãs, timestamps malformados, quebras de schema drift).
4. **Formatos de Exportação:** CSV, JSON, SQL DDL (e no roadmap futuro: Parquet, Delta Lake, Avro).

### 1.3 Público-Alvo e Casos de Uso
- **Engenheiros de Dados:** Testes de estresse em pipelines ETL/ELT e pipelines de qualidade de dados.
- **Analistas e Cientistas de Dados:** Construção de dashboards, análise exploratória e preparação de dados.
- **Estudantes e Educadores:** Prática de SQL complexo, modelagem dimensional e preparação para entrevistas técnicas.

---

## 2. 🏗️ Arquitetura e Stack Tecnológica

O projeto é estruturado em uma arquitetura monorreferenciada com separação clara de responsabilidades:

```
.
├── .ai/                    # Governança de IA, regras, memórias, prompts e skills
│   ├── SKILLS/             # Skills operacionais de IA (este arquivo e subskills)
│   ├── agents/             # Definição dos papéis especializados (Frontend, Backend, Data Eng)
│   ├── context/            # Contextos de arquitetura e produto
│   ├── memory/             # Foco atual, problemas conhecidos e roadmap
│   ├── prompts/            # Prompts mestre (geração de schema, dirty engine)
│   └── rules/              # Regras obrigatórias de arquitetura e código
├── docs/                   # Documentação detalhada e numerada do sistema
├── frontend/               # Aplicação web Next.js (Interface do Workspace)
├── tools/                  # Utilitários de documentação e automação local
└── datasets/ / schemas/    # Diretórios de artefatos de dados e esquemas
```

### 2.1 Stack do Frontend (`frontend/`)
- **Framework:** Next.js (App Router, React 18/19, TypeScript).
- **Estilização:** Tailwind CSS.
- **Gerenciamento de Estado:** Zustand (`useWorkspaceStore.ts`).
- **Visualização de Grafo Relacional (ERD):** `@xyflow/react` (React Flow).
- **Tabela de Dados Virtualizada:** `@tanstack/react-table`.
- **Ícones & Primitivos:** `lucide-react`.

### 2.2 Stack do Backend (Planejado / Em Implementação)
- **Linguagem:** Python 3.11+.
- **Framework Web:** FastAPI (com endpoints assíncronos).
- **Validação & Tipagem:** Pydantic V2.
- **Banco de Dados (Metadados/Cache):** PostgreSQL.
- **Motor de IA:** Integração com APIs LLM (OpenAI API / modelos avançados) com saída estritamente em JSON estruturado.

---

## 3. 📊 Estado Atual do Desenvolvimento

Para atuar com precisão, o agente deve estar ciente do momento atual do projeto:

| Camada | Estado Atual | Detalhes |
| :--- | :--- | :--- |
| **Documentação (`docs/`)** | **100% Mapeada** | Requisitos, design do sistema, ADRs, regras de dirty engine e tarefas detalhadas. |
| **Frontend (`frontend/`)** | **Protótipo Interativo Avançado** | O Split Workspace está implementado com: painel de controles esquerdo, visualizador de grafo ERD com zoom/pan e tabela de preview com highlight de anomalias operando sobre mock integrado. |
| **Backend (`backend/`)** | **Em Reestruturação** | Teve setup inicial em FastAPI com rotas básicas; foco recente foi transferido para a experiência da interface e agora aguarda integração definitiva. |
| **Governança de IA (`.ai/`)** | **Ativa e Estruturada** | Agentes, regras de código, memórias de foco e prompts mapeados. |

---

## 4. ⚖️ Regras e Padrões Mandatórios de Desenvolvimento

Qualquer modificação no código ou documentação DEVE obedecer a estas regras:

1. **Modularidade e Baixo Acoplamento:** Módulos de geração de esquema, geração de dados e corrupção (Dirty Engine) devem ser independentes.
2. **Isolamento de IA:** Não misturar chamadas diretas a provedores de LLM dentro de rotas HTTP ou componentes de UI. A lógica de IA reside em serviços dedicados.
3. **Tipagem Estrita (Zero `any`):**
   - No **Frontend:** TypeScript rigoroso. Qualquer estrutura de dados deve ter interface tipada em `src/types/`.
   - No **Backend:** Type hints completos e schemas Pydantic para validação de entrada/saída.
4. **Sem Lógica de Negócio em Rotas:** Rotas de API são apenas controladores HTTP que invocam serviços.
5. **Padrão de Nomenclatura de Dados:** Entidades geradas, tabelas e colunas devem seguir impreterivelmente o formato `snake_case`.
6. **Integridade de Documentação:** Preservar comentários, docstrings e ADRs existentes. Nunca duplicar requisitos em arquivos distintos.

---

## 5. 🔀 Direcionamento para Subskills e Agentes Especializados

Quando o agente for atuar em uma frente específica, deve seguir as diretrizes da respectiva subskill/área:

### 🔹 Subskill 1: Frontend & Interface do Workspace
* **Papel / Agente:** `.ai/agents/frontend-agent.md`
* **Documentações-Chave:**
  * `docs/05-frontend/frontend-architecture.md`
  * `docs/05-frontend/ui-system.md`
  * `docs/05-frontend/components.md`
* **Código Principal:**
  * Página do Workspace: `frontend/src/app/(workspace)/page.tsx`
  * Estado Global: `frontend/src/stores/useWorkspaceStore.ts`
  * Controles de Entrada: `frontend/src/components/controls/`
  * Visualizador de Grafo ERD: `frontend/src/components/visualization/`
  * Tabela de Preview & Corrupções: `frontend/src/components/preview/`
  * Exportadores: `frontend/src/utils/exportHelpers.ts`
* **Objetivo Imediato:** Evoluir da camada de mock atual para integração com chamadas assíncronas reais à API e refinamentos visuais de acessibilidade e responsividade.

### 🔹 Subskill 2: Backend & Motor de Serviços
* **Papel / Agente:** `.ai/agents/backend-agent.md`
* **Documentações-Chave:**
  * `docs/03-architecture/system-design.md`
  * `docs/04-backend/backend-structure.md`
  * `docs/04-backend/services.md`
  * `docs/09-api/routes.md`
  * `docs/13-decisions/ADR-001-fastapi-choice.md`
* **Módulos que Devem Existir:**
  * `LLMInterpreterService`: Recebe o prompt e extrai intenções de negócio.
  * `SchemaGeneratorService`: Gera o grafo relacional estruturado (tabelas, colunas, PKs/FKs).
  * `DatasetGeneratorService`: Popula as tabelas sintéticas mantendo integridade relacional.
  * `DirtyEngineService`: Aplica as corrupções configuradas conforme o nível selecionado.
  * `ExportService`: Converte os datasets gerados em CSV, JSON, SQL ou outros formatos.

### 🔹 Subskill 3: Engenharia de Dados & Dirty Engine
* **Papel / Agente:** `.ai/agents/data-engineering-agent.md`
* **Documentações-Chave:**
  * `docs/07-data-generation/generation-engine.md`
  * `docs/07-data-generation/distribution-rules.md`
  * `docs/08-dirty-engine/dirty-levels.md`
  * `docs/08-dirty-engine/corruption-rules.md`
  * `docs/08-dirty-engine/schema-drift.md`
  * `.ai/prompts/dirty-engine.md`
  * `.ai/prompts/schema-generation.md`
* **Foco:** Garantir realismo dos dados, distribuição coerente (ex: leis de potência, sazonalidade) e catálogo padronizado de corrupções (null injection, broken foreign keys, timestamp drift, schema drift).

### 🔹 Subskill 4: Validação de Integração entre as Stacks
Para assegurar a perfeita harmonia entre Frontend, Backend e o Modelo de IA, o agente deve validar:
1. **Contrato de Schema Relacional:**
   * O payload retornado pela API deve corresponder exatamente à interface `Schema` em `frontend/src/types/schema.ts`:
     ```ts
     {
       id: string;
       title: string;
       description?: string;
       tables: Table[]; // cada Table com id, name, columns (com isPrimaryKey, foreignKey)
     }
     ```
2. **Contrato de Dataset & Corrupção:**
   * O payload de dados deve seguir a interface `DatasetResponse` em `frontend/src/types/dataset.ts`.
   * Células corrompidas pelo Dirty Engine devem conter metadados auxiliares na linha (ex: `_corrupted_<colName>: true`, `_original_<colName>: valor`) para que o componente `CellHighlight` no frontend possa evidenciá-las visualmente.
3. **Endpoints da API (`docs/09-api/routes.md`):**
   * `POST /generate-schema`: Recebe `{ scenario: string }` e devolve o `Schema`.
   * `POST /generate-dataset`: Recebe `{ schemaId: string, rows: number, dirtyLevel: DirtyLevel }` e processa os dados.
   * `GET /download/{datasetId}?format=CSV|JSON|SQL`: Download direto do arquivo consolidado.

---

## 6. 🗺️ Mapa de Navegação Rápida (Quick File Finder)

Para localização imediata dos pontos centrais do projeto:

* **README Principal:** [`README.md`](file:///C:/Users/pedro/Desktop/Dev/Projects/Personal/DaaS/README.md)
* **Índice de Toda a Documentação:** [`docs/README.md`](file:///C:/Users/pedro/Desktop/Dev/Projects/Personal/DaaS/docs/README.md)
* **Design de Sistema & Arquitetura:** [`docs/03-architecture/system-design.md`](file:///C:/Users/pedro/Desktop/Dev/Projects/Personal/DaaS/docs/03-architecture/system-design.md)
* **Workspace Principal (Frontend):** [`frontend/src/app/(workspace)/page.tsx`](file:///C:/Users/pedro/Desktop/Dev/Projects/Personal/DaaS/frontend/src/app/(workspace)/page.tsx)
* **Store do Workspace (Zustand):** [`frontend/src/stores/useWorkspaceStore.ts`](file:///C:/Users/pedro/Desktop/Dev/Projects/Personal/DaaS/frontend/src/stores/useWorkspaceStore.ts)
* **Tipos de Dados do Frontend:** [`frontend/src/types/schema.ts`](file:///C:/Users/pedro/Desktop/Dev/Projects/Personal/DaaS/frontend/src/types/schema.ts) e [`frontend/src/types/dataset.ts`](file:///C:/Users/pedro/Desktop/Dev/Projects/Personal/DaaS/frontend/src/types/dataset.ts)
* **Mocks de Teste:** [`frontend/src/mocks/mockSchemaResponse.ts`](file:///C:/Users/pedro/Desktop/Dev/Projects/Personal/DaaS/frontend/src/mocks/mockSchemaResponse.ts)
* **Foco da Sprint & Memória:** [`.ai/memory/current-focus.md`](file:///C:/Users/pedro/Desktop/Dev/Projects/Personal/DaaS/.ai/memory/current-focus.md)
* **Regras de Codificação:** [`.ai/rules/coding-rules.md`](file:///C:/Users/pedro/Desktop/Dev/Projects/Personal/DaaS/.ai/rules/coding-rules.md)
