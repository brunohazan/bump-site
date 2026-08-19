import { redirect } from "next/navigation";

// A v3 agora é a Home oficial em "/". Mantemos a rota antiga redirecionando
// para não quebrar links já compartilhados e evitar conteúdo duplicado.
export default function HomeV3Page() {
  redirect("/");
}
