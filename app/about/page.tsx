export const metadata = { title: "About Us | Medico" };
import { AboutMarkup } from "@/components/stitch/AboutMarkup";
import { StitchLanding } from "@/components/stitch/StitchLanding";
import "../stitch-landing.css";
import "../stitch-controls.css";
export default function Page(){return <StitchLanding><AboutMarkup /></StitchLanding>;}
