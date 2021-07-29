import {INFURA_ADDRESS, ADDRESS, ABI} from "../config"
import Web3 from "web3";

// import the json containing all metadata. not recommended, try to fetch the database from a middleware if possible, I use MONGODB for example
import traits from "../finaltraits.json";

const infuraAddress = INFURA_ADDRESS

const myrankApi = async(req, res) => {

    // SOME WEB3 STUFF TO CONNECT TO SMART CONTRACT
  const provider = new Web3.providers.HttpProvider(infuraAddress)
  const web3infura = new Web3(provider);
  const rankContract = new web3infura.eth.Contract(ABI, ADDRESS)
  


  // IF YOU ARE USING INSTA REVEAL MODEL, USE THIS TO GET HOW MANY NFTS ARE MINTED
//   const totalSupply = await bananaContract.methods.totalSupply().call();
//   console.log(totalSupply)
  


// THE ID YOU ASKED IN THE URL
  const query = req.query.id;


  // IF YOU ARE USING INSTA REVEAL MODEL, UNCOMMENT THIS AND COMMENT THE TWO LINES BELOW
//   if(parseInt(query) < totalSupply) {
  const totalRank = 10000;
  if(parseInt(query) < totalRank) {


    // CALL CUSTOM TOKEN NAME IN THE CONTRACT
    //const tokenNameCall = await bananaContract.methods.bananaNames(query).call();
    //let tokenName = `#${query}${(tokenNameCall === '') ? "" : ` - ${tokenNameCall}`}`

    // IF YOU ARE NOT USING CUSTOM NAMES, JUST USE THIS
    // let tokenName= `#${query}`

    
    
   // const signatures = [137,883,1327,1781,2528,2763,3833,5568,5858,6585,6812,7154,8412]
    const trait = traits[parseInt(query)]
    // const trait = traits[ Math.floor(Math.random() * 8888) ] // for testing on rinkeby 

    // CHECK OPENSEA METADATA STANDARD DOCUMENTATION https://docs.opensea.io/docs/metadata-standards
    
    // IF THE REQUESTED TOKEN IS A SIGNATURE, RETURN THIS METADATA
    

    let metadata = {
        "name": tokenName,
        "description": "This journey starts with an egg at mint, then hatches to produce a baby whale 7 days after mint. Give these baby whales a chance to grow in your wallet and watch them advance to an adult whale within 14 days.",
        "tokenId" : parseInt(query),
        "image": `https://ipfs.io/ipfs/${trait["imageIPFS"]}`,
        "external_url":"https://www.myranknft.art",
        "attributes": [          
            {
              "trait_type": "Background",
              "value": trait["Background"]
            },
            {
              "trait_type": "Body",
              "value": trait["Body"]
            },
            {
              "trait_type": "Shell",
              "value": trait["Shell"]
            },
            {
              "trait_type": "Eyes",
              "value": trait["Eyes"]
            },
            {
              "trait_type": "Belly",
              "value": trait["Belly"]
            },
            {
                "trait_type": "Tail",
                "value": trait["Tail"]
            },
    
        ]
      
      
      // console.log(metadata)

    }
    
    res.statusCode = 200
    res.json(metadata)
  } else {
    res.statuscode = 404
    res.json({error: "The whale you requested is out of range"})

  }


  // this is after the reveal

  
}

export default myrankApi