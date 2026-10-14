export const metadata = { title: "Find a Doctor | Medico" };
import { DoctorsMarkup } from "@/components/stitch/DoctorsMarkup";
import { StitchLanding } from "@/components/stitch/StitchLanding";
import "../stitch-landing.css";
import "../stitch-controls.css";
export default function Page(){return <StitchLanding><DoctorsMarkup /></StitchLanding>;}
