import { useLocation } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Card from "../components/ui/Card";

export default function ComingSoon() {
  const name = useLocation().pathname.split("/").pop();
  return (
    <>
      <PageHeader title={name.charAt(0).toUpperCase() + name.slice(1)} />
      <Card className="py-16 text-center text-muted">This section hasn't been built yet.</Card>
    </>
  );
}
    