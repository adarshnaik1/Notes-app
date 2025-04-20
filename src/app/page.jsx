import { Space_Grotesk, DM_Sans } from "next/font/google";
import Flip_Words from "@/components/FlipWords";
import { LandingPage } from "./screens/LandingPage";

const space_Grotesk = Space_Grotesk({ subsets: ['latin'] }); // ✅ fixed
const dm_Sans = DM_Sans({ subsets: ['latin'] });             // ✅ fixed

export default function Home() {
  return (
    <div className={`${space_Grotesk.className} bg-black`}>
      <LandingPage />
    </div>
  );
}
