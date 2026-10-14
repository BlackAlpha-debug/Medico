import { StitchMarkup } from "@/components/stitch/StitchMarkup";
import { StitchLanding } from "@/components/stitch/StitchLanding";
import "./stitch-landing.css";
import "./stitch-controls.css";
export default function Home() {
  return (
    <StitchLanding>
      <StitchMarkup />
    </StitchLanding>
  );
}
