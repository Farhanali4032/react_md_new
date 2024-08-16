import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getSingleMatterData } from "../getSingleMatterData/getSingleMattersDataActions";
import { selectDataSingleMatterBackgroundData, selectDataSingleMatterBackgroundLoading, selectDataSingleMatterError, selectDataSingleMatterLoading } from "../getSingleMatterData/getSingleMattersDataSelectors";


export function BackgroundData (matterId) {
    const dispatch = useDispatch();
    useEffect(async () => {
      
        await dispatch(getSingleMatterData(matterId, 'background'))
   
    }, [])
  
    const selectBackgroundData = useSelector(selectDataSingleMatterBackgroundData)
    const selectBackgroundLoading = useSelector(selectDataSingleMatterBackgroundLoading)
    const selectBackgroundError = useSelector(selectDataSingleMatterError)

    const selectBackground = selectBackgroundData;

    const backgroundData = {
      client: selectBackground?.body?.find(data => data.role === 'Client') || {},
      opposingParty: selectBackground?.body?.find(data => data.role === 'Opposing Party') || {}
    }
  
    return {
      backgroundData,
      selectBackground,
      selectBackgroundLoading,
      selectBackgroundError
    }
  }