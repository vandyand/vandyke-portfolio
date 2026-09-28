import SpecialtyPage, { specialtyMetadata } from "@/components/SpecialtyPage";
import { specialties } from "@/lib/specialties";

const specialty = specialties[2];

export const metadata = specialtyMetadata(specialty);

export default function AgenticAiPage() {
  return <SpecialtyPage specialty={specialty} />;
}
