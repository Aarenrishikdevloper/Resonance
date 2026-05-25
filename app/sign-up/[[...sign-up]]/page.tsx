import React from 'react';
import {SignUp} from "@clerk/nextjs";

function Page() {
    return (
        <div  className={'flex min-h-screen  items-center justify-center bg-background'}>
            <SignUp
                  appearance={{
                      elements:{
                          rootBox:"mx-auto" ,
                          card:"shadow-lg" ,
                      }
                  }}
            />
        </div>
    );
}

export default Page;