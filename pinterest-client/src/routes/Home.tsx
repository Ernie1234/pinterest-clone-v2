import {
  Jumbotron,
  SaveIdeasSection,
  SearchIdeasSection,
  SeeItDoItSection,
  SignUpSection,
} from "../components";
import Login from "../components/Login";

export default function Home() {
  return (
    // <div className="snap-y snap-mandatory h-screen w-screen mx:auto overflow-x-hidden scroll-smooth no-scrollbar">
    //   <section className="h-screen snap-center" id="Jumbotron">
    //     <Jumbotron />
    //   </section>
    //   <section className="h-screen snap-center" id="SearchIdeasSection">
    //     <SearchIdeasSection />
    //   </section>
    //   <section className="h-screen snap-center" id="SaveIdeasSection">
    //     <SaveIdeasSection />
    //   </section>
    //   <section className="h-screen snap-center" id="SeeItDoItSection">
    //     <SeeItDoItSection />
    //   </section>
    //   <section className="h-screen snap-center" id="SignUpSection">
    //     <SignUpSection />
    //   </section>
    // </div>
    <div className="flex justify-center items-center h-screen w-screen">
      <Login />
    </div>
  );
}
