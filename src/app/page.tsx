import dynamic from "next/dynamic";

const NoSSRContainer = dynamic(() => import("./components/NoSSRContainer"));

// Default Game Page
export default function Home() {
  return (
    <div>
      <div id="blurred-background"></div>
      <div id="no-ssr-container">
        <NoSSRContainer></NoSSRContainer>
      </div>
    </div>
  );
}
