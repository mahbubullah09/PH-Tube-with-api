const loadCatagory = async () => {

    const catagory = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await catagory.json();
    const catagoryNames = data.data;
    handleCatagory(catagoryNames)


}

//handleCatagory

const handleCatagory = (names) => {
 
    const catagoryId = document.getElementById('catagory-field');
    catagoryId.innerHTML = ''

    names.forEach(name => {

        const catagoryName = document.createElement('div');


        catagoryName.innerHTML = `
    
     <button onclick="loadVideo('${name.category_id}')" class="bg-[#252525] bg-opacity-20 text-[ #252525] text-base py-1 px-3 rounded mt-2 ">${name.category}</button>`

        catagoryId.appendChild(catagoryName);
    });
}





// load video 


const loadVideo = async (ID) => {
  
    const catagoryName = document.createElement('div');
    catagoryName.innerHTML = '';








    const cardId = await fetch(` https://openapi.programming-hero.com/api/videos/category/${ID}`);
    const card = await cardId.json();
    const data = card.data;




    let cardDetails = data;

  

    const cardField = document.getElementById('card-field');
    cardField.innerHTML = '';

    

    if (cardDetails.length == 0) {

        cardField.innerHTML = `

      
        <div class="mx-auto col-span-4 text-center mt-6 md:mt-20 ">

        <img src="./images/Icon.png" alt="">

        </div>

        <p class=" font-bold text-2xl md:text-5xl max-w-2xl  mx-auto  text-center col-span-4 mb-6 md:mb-20">Oops!! Sorry, There is no content here</p>
       
        
        
        
        `


    }

   



    cardDetails.forEach(cardData => {





        const cardInfo = document.createElement('div');
        cardInfo.classList.add('my-2', 'cursor-pointer');

        cardInfo.innerHTML = `
        <figure class=" relative ">
        <img class="md:h-60  lg:h-44 w-full rounded" src="${cardData.thumbnail} alt="">
        <div id="${cardData.thumbnail}" class="absolute bottom-2 right-2">
       
         
        </div>
     </figure>

     <div class=" mt-4 flex  justify-start items-start gap-2 ml-1">
          <figure class="flex-initial">         
        <img class="rounded-full w-10 h-10"  src=${cardData.authors[0].profile_picture} alt="">
     </figure>  
        <div class="right ">
            <h4 class="text-base font-bold ">${cardData.title}</h4>
            
            <div id="${cardData.thumbnail}-img" class="flex items-center gap-2">
            <p class="text-[#171717] text-opacity-70 "> ${cardData.authors[0].profile_name}</p>
            
           
        </div>
            <p class="text-[#171717] text-opacity-70 ">${cardData.others.views} views</p>
        </div>
     </div>
        
        
        `
        cardField.appendChild(cardInfo);


        // time show in video card


        const vidId = document.getElementById(`${cardData.thumbnail}`);

        const postDate = cardData.others.posted_date;

        // convert to hours and minutes 

        const hours = Math.floor(postDate / 3600);
        const minutes = Math.floor((postDate % 3600) / 60);

        const time = `${hours}hrs ${minutes} min`;

        // if post date available

        if (postDate !== '') {
            const postDate = cardData.others.posted_date;
            if (postDate !== '') {

                const pera = document.createElement('p');
                pera.classList.add('bg-black', 'text-white', 'text-xs', 'py-1', 'px-2', 'rounded');


                pera.innerHTML = `${time} ago`;

                vidId.appendChild(pera);
            }
        }


        //verify tick


        const verifyId = document.getElementById(`${cardData.thumbnail}-img`);

        const verifyStatus = cardData.authors[0].verified;

        //check verifyed or not? 

        if (verifyStatus === true) {

            const newDiv = document.createElement('div');
            newDiv.innerHTML = `
             <img src="./images/fi_10629607.png" alt="">
             `

            verifyId.appendChild(newDiv);
        }
    });


    //sorting button

    document.getElementById('click').onclick = function () {
        const cardField = document.getElementById('card-field');
        cardField.innerHTML = '';


             cardDetails.sort((a, b) => {
            let x = parseInt(a.others.views)
            let y = parseInt(b.others.views)


        return y-x;
        });


        if (cardDetails.length == 0) {

            cardField.innerHTML = `
    
          
            <div class="mx-auto col-span-4 text-center mt-6 md:mt-20 ">
    
            <img src="./images/Icon.png" alt="">
    
            </div>
    
            <p class=" font-bold text-2xl md:text-5xl max-w-2xl  mx-auto  text-center col-span-4 mb-6 md:mb-20">Oops!! Sorry, There is no content here</p>
           
            
            
            
            `
    
    
        }

      


        cardDetails.forEach(cardData => {





            const cardInfo = document.createElement('div');
            cardInfo.classList.add('my-2', 'cursor-pointer');

            cardInfo.innerHTML = `
            <figure class=" relative ">
            <img class="md:h-60  lg:h-44 w-full rounded" src="${cardData.thumbnail} alt="">
            <div id="${cardData.thumbnail}" class="absolute bottom-2 right-2">
           
             
            </div>
         </figure>
    
         <div class=" mt-4 flex  justify-start items-start gap-2 ml-1">
              <figure class="flex-initial">         
            <img class="rounded-full w-10 h-10"  src=${cardData.authors[0].profile_picture} alt="">
         </figure>  
            <div class="right ">
                <h4 class="text-base font-bold ">${cardData.title}</h4>
                
                <div id="${cardData.thumbnail}-img" class="flex items-center gap-2">
                <p class="text-[#171717] text-opacity-70 "> ${cardData.authors[0].profile_name}</p>
                
               
            </div>
                <p class="text-[#171717] text-opacity-70 ">${cardData.others.views} views</p>
            </div>
         </div>
            
            
            `
            cardField.appendChild(cardInfo);


            // time show in video card


            const vidId = document.getElementById(`${cardData.thumbnail}`);

            const postDate = cardData.others.posted_date;

            // convert to hours and minutes 

            const hours = Math.floor(postDate / 3600);
            const minutes = Math.floor((postDate % 3600) / 60);

            const time = `${hours}hrs ${minutes} min`;

            // if post date available

            if (postDate !== '') {
                const postDate = cardData.others.posted_date;
                if (postDate !== '') {

                    const pera = document.createElement('p');
                    pera.classList.add('bg-black', 'text-white', 'text-xs', 'py-1', 'px-2', 'rounded');


                    pera.innerHTML = `${time} ago`;

                    vidId.appendChild(pera);
                }
            }


            //verify tick


            const verifyId = document.getElementById(`${cardData.thumbnail}-img`);

            const verifyStatus = cardData.authors[0].verified;

            //check verifyed or not? 

            if (verifyStatus === true) {

                const newDiv = document.createElement('div');
                newDiv.innerHTML = `
                 <img src="./images/fi_10629607.png" alt="">
                 `

                verifyId.appendChild(newDiv);
            }
        });


    }











}




//load Catagory field
loadCatagory();

// inithial all catagory

loadVideo('1000')