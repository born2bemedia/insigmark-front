import {
  HomeBenefits,
  HomeDescription,
  HomeFaq,
  HomeHero,
  HomeNews,
  HomeNumbers,
  HomePricing,
  HomeProcess,
  HomeQuote,
  HomeRequest,
  HomeServices,
  HomeTeam,
  HomeTech,
  HomeTestimonials,
  HomeWork,
} from "./components";

export default async function Home() {
  return (
    <>
      <HomeHero />
      <HomeNumbers />
      <HomeDescription />
      <HomeBenefits />
      <HomeWork />
      <HomeServices />
      <HomeQuote />
      <HomeTech />
      <HomeTeam />
      <HomePricing />
      <HomeProcess />
      <HomeTestimonials />
      <HomeFaq />
      <HomeNews />
      <HomeRequest />
    </>
  );
}
