import {
  Jumbotron,
  SaveIdeasSection,
  SearchIdeasSection,
  SeeItDoItSection,
  SignUpSection,
} from "../components";

export default function Home() {
  return (
    <div className="snap-y snap-mandatory h-screen w-screen mx:auto overflow-x-hidden scroll-smooth no-scrollbar">
      <section className="h-screen snap-center" id="Jumbotron">
        <Jumbotron />
      </section>
      <section className="h-screen snap-center" id="SearchIdeasSection">
        <SearchIdeasSection />
      </section>
      <section className="h-screen snap-center" id="SaveIdeasSection">
        <SaveIdeasSection />
      </section>
      <section className="h-screen snap-center" id="SeeItDoItSection">
        <SeeItDoItSection />
      </section>
      <section className="h-screen snap-center" id="SignUpSection">
        <SignUpSection />
      </section>
    </div>
  );
}
