import { StitchMarkup } from "@/components/stitch/StitchMarkup";
import { StitchLanding } from "@/components/stitch/StitchLanding";
import "../stitch-landing.css";
import "../stitch-controls.css";
export default function Page() {
  return (
    <StitchLanding>
      <StitchMarkup view="departments" />
    </StitchLanding>
  );
}
