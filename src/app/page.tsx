import { ScrollReveal } from "@/components/ScrollReveal";
import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Engenharia } from "@/components/home/Engenharia";
import { Linha } from "@/components/home/Linha";
import { AntesDepois } from "@/components/home/AntesDepois";
import { Aplicacoes } from "@/components/home/Aplicacoes";
import { Processo } from "@/components/home/Processo";
import { Prova } from "@/components/home/Prova";
import { Projeto } from "@/components/home/Projeto";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <Hero />
      <Manifesto />
      <Engenharia />
      <Linha />
      <AntesDepois />
      <Aplicacoes />
      <Processo />
      <Prova />
      <Projeto />
      <Footer />
    </>
  );
}
