import {useEffect, useMemo, useState} from "react";
import MetaData from "../metadata.json"

export const useArticles = () => {
    const [ articles, setArticles ] = useState([])

    useEffect(() => {
        setArticles(MetaData.articles)
    }, [setArticles])

    return useMemo(() => articles, [articles])
}

export const useArticle = (mdFile) => {

}