import React, {useEffect} from "react";
import Catalog from "../../Components/catalog/Catalog.js";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";

export default function CatalogPage() {
    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = 'Каталог | DEVICE'
    }, [])

    return (
        <>
            <Breadcrumbs url={window.location.pathname.slice(1)} type='breadcrumbs/page/'/>
            <Catalog withHeader={true} headerTag='h2' showAll={true}/>
        </>
    );
}