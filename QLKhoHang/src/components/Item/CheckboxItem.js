import React from 'react'
import { View } from 'react-native'

function CheckboxItem() {
   
    const [allIds, setAllIds] = useState([]);

    const handleChange = (id) =>{
        if(id){
          // if(allId == true){
            setAllIds([...allIds,id])
            // console.log(id, "our value");
            //console.log(id);
          // }
          // setAllId(!allId)
        }
        // console.log(data);
      }

  return (
    <input type="checkbox" value={allIds} onChange={()=> {handleChange(item._id)}} />
    )
}

export default CheckboxItem