import { useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronRight, Trash2, Info, Package, Star, Eye } from "lucide-react";
import Button from "../components/ui/Button";
import Tabs from "../components/ui/Tabs";
import ProductSidebar from "../components/marketplace/ProductSidebar";
import ProductInfoTab from "../components/marketplace/ProductInfoTab";
import SizesTab from "../components/marketplace/SizesTab";
import ReviewsTab from "../components/marketplace/ReviewsTab";
import VisibilityTab from "../components/marketplace/VisibilityTab";
import { products, emptyProduct } from "../data/products";

/** mode="new" -> Add New Product (Product Info / Size Guide / Visibility)
 *  mode="edit" -> Product Details (Product Info / Inventory & Sizes / Reviews / Visibility) */
export default function ProductForm({ mode }) {
  const edit = mode === "edit";
  const nav = useNavigate();
  const { id } = useParams();
  const [p, setP] = useState(() => (edit ? structuredClone(products.find((x) => String(x.id) === id) ?? emptyProduct()) : emptyProduct()));
  const [tab, setTab] = useState("info");
  const set = useCallback((patch) => setP((prev) => ({ ...prev, ...patch })), []);

  const tabs = [
    { id: "info", label: "Product Info", icon: Info },
    { id: "sizes", label: edit ? "Inventory & Sizes" : "Size Guide", icon: Package },
    ...(edit ? [{ id: "reviews", label: `Reviews (${p.reviews.length})`, icon: Star }] : []),
    { id: "visibility", label: "Visibility & Settings", icon: Eye },
  ];
  const back = () => nav("/admin/marketplace");

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/admin/marketplace" className="italic text-muted">Back</Link>
          <ChevronRight size={14} className="text-accent" />
          <span className="font-bold italic">{edit ? "Product Details" : "Add New Product"}</span>
        </nav>
        <div className="flex items-center gap-3">
          {edit && <Button variant="danger" onClick={back}><Trash2 size={14} /> Delete</Button>}
          <Button variant="outline" onClick={back}>Cancel</Button>
          <Button variant="accent" onClick={back}>{edit ? "Save Changes" : "Add Product"}</Button>
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[20rem_1fr]">
        <ProductSidebar p={p} set={set} edit={edit} />
        <div className="min-w-0">
          <Tabs tabs={tabs} value={tab} onChange={setTab} />
          {tab === "info" && <ProductInfoTab p={p} set={set} />}
          {tab === "sizes" && <SizesTab p={p} set={set} edit={edit} />}
          {tab === "reviews" && <ReviewsTab p={p} set={set} />}
          {tab === "visibility" && <VisibilityTab p={p} set={set} />}
        </div>
      </div>
    </>
  );
}
