import dynamic from "next/dynamic";

const NoSSRContainer = dynamic(() => import("./components/NoSSRContainer"));

export default function Home() {
  return (
    <div id="no-ssr-container">
      <NoSSRContainer></NoSSRContainer>
    </div>
  );
}
