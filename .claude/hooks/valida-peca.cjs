#!/usr/bin/env node
/**
 * valida-peca.cjs — Hook PostToolUse (Write|Edit)
 * Confere regras BINARIAS de copy de peca: travessao e contagem de hashtag.
 * Dispara so em .md dentro de criacao/ ou de uma pasta "* Design/". Modo aviso (exit 2).
 */
const fs = require('fs');

function lerStdin() {
  try { return fs.readFileSync(0, 'utf8'); } catch { return ''; }
}

function main() {
  let data;
  try { data = JSON.parse(lerStdin()); } catch { process.exit(0); }

  const filePath = data && data.tool_input && data.tool_input.file_path;
  if (!filePath) process.exit(0);

  const ehCopyDePeca =
    filePath.endsWith('.md') &&
    (/\/criacao\//.test(filePath) || / Design\//.test(filePath));
  if (!ehCopyDePeca) process.exit(0);

  let conteudo;
  try { conteudo = fs.readFileSync(filePath, 'utf8'); } catch { process.exit(0); }

  const problemas = [];

  // Travessao (em dash U+2014, en dash U+2013). Hifen comum (-) nao conta.
  if (/[—–]/.test(conteudo)) {
    problemas.push('Travessao encontrado. Regra do diretor-criacao: trocar por ponto final ou quebra de linha.');
  }

  // Hashtags. Ignora "## " de cabecalho markdown (exige palavra colada ao #).
  const hashtags = conteudo.match(/(^|\s)#[\wÀ-ÿ]+/g) || [];
  if (hashtags.length > 3) {
    problemas.push(`${hashtags.length} hashtags encontradas. Regra do copywriter: maximo 3 por post.`);
  }

  if (problemas.length > 0) {
    console.error(`[valida-peca] ${filePath}\n- ${problemas.join('\n- ')}`);
    process.exit(2);
  }
  process.exit(0);
}

main();
