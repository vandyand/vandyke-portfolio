import SpecialtyPage, { specialtyMetadata } from "@/components/SpecialtyPage";
import { specialties } from "@/lib/specialties";

const specialty = specialties[1];

export const metadata = specialtyMetadata(specialty);

export default function QuantFinancePage() {
  return <SpecialtyPage specialty={specialty} />;
}
