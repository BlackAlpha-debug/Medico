export const metadata = { title: "Contact Us | Medico" };
import { ContactMarkup } from "@/components/stitch/ContactMarkup";
import { StitchLanding } from "@/components/stitch/StitchLanding";
import "../stitch-landing.css";
import "../stitch-controls.css";
export default function Page(){return <StitchLanding><ContactMarkup /></StitchLanding>;}
