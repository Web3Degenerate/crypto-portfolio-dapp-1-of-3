import './App.css';
import React, { useState, useEffect } from "react"; 

function App() {

// How track our app: https://youtu.be/doEBbQklDUE?si=NHXyyW0EY3OR4rJ0&t=338
  const [assets, setAssets] = useState([]) //array of tokens wallet has
  // const [address, setAddress] = useState('') //wallet address
  const [address, setAddress] = useState('0x575B5aC8903aa80cba5B9fe8fC63b775033819Ca') //wallet address



  //function for fetching assets
    const fetchAssets = async (address) => {
    // const fetchAssets = async () => {
    
      try{
        const response = await fetch(`https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=eth&exclude_spam=true&exclude_unverified_contracts=true`, {
        // const response = await fetch(`https://deep-index.moralis.io/api/v2.2/wallets/0x575B5aC8903aa80cba5B9fe8fC63b775033819Ca/tokens?chain=eth&exclude_spam=true&exclude_unverified_contracts=true`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY 
          }
        })
        // Get json version of the reponse (9:35)
        const data = await response.json();
        setAssets(data.result)
      }catch(error){
        console.error("Error fetching assets: ", error)
      }
    }

//Set up handleInputChange (24:45)
    const handleInputChange = (e) => {
      setAddress(e.target.value)
    }
    
    const handleButtonClick = (e) => {
      fetchAssets(address)
    }
// Set useEffect when launch our page (11:03)
    // useEffect( () => {
    //   fetchAssets()
    // }, [])
//Pass in default address (25:44)
    useEffect( () => {
      fetchAssets(address)
    }, [address]) //pass in dependency here which is address (25:50)


  return (
    <div className="App">
      <h1>Crypto Wallet Tracker</h1>


    <input
      type="text"
      value={address}
      onChange={handleInputChange}
      placeholder="Enter wallet address"
    />
    <button onClick={handleButtonClick}>Search</button>

      <table>
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Price</th>
              <th>Value</th>
              <th>24h change</th>
            </tr>
          </thead>
          <tbody>
            {assets.map( (asset) => (
              <tr key={asset.token_address}>
                <td><img src={asset.thumbnail} alt={asset.name} className='asset-logo' /></td>
                <td>{asset.name}</td>
                <td>{asset.usd_price?.toFixed(2)}</td>
                <td>{asset.usd_value?.toFixed(2)}</td>
                <td className={asset.usd_price_24hr_percent_change < 0 ? "negative" : "positive"}>
                  {asset.usd_price_24hr_percent_change?.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  );
}

export default App;
