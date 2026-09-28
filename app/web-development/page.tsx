import SpecialtyPage, { specialtyMetadata } from "@/components/SpecialtyPage";
import { specialties } from "@/lib/specialties";

const specialty = specialties[0];

export const metadata = specialtyMetadata(specialty);

export default function WebDevelopmentPage() {
  return <SpecialtyPage specialty={specialty} />;
}
