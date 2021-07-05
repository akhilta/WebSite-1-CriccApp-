
window.onload=()=>{
    const mobileOpenTag=document.querySelector('.openTagInMobile');
    const sideDivWrapper=document.querySelector('.SideDivWrapper');
    const sideBarContentWrapper=document.querySelector('.SideBarContentWrapper');
    const closeTagInMobile=document.querySelector('.CloseTagInMobile');
    console.log(closeTagInMobile.textContent);
    mobileOpenTag.addEventListener("click", 
    ()=>{
        console.log("came here ---")
        mobileOpenTag.style.visibility='hidden';
        sideDivWrapper.style.display='block';
        sideDivWrapper.style.position='absolute';
        sideDivWrapper.style.height='100%';
        sideDivWrapper.style.left='0px';
        // sideDivWrapper.style.width='200px';
        // sideBarContentWrapper.style.width='100%';
    }
    );

    closeTagInMobile.addEventListener("click",
    ()=>{
        console.log("came here ---")
        mobileOpenTag.style.visibility='visible';
        sideDivWrapper.style.display='none';
    }
    );
}


