return [ experiments: [
            [  label: "Homepage Try Button Label",
               googleOptimizeUrl: "https://optimize.google.com/optimize/home/#/accounts/4705248373/containers/15592299/experiments/6",
               url: "/", 
               variants: [[ label: "Original", params: "v=0", gaexp: "0" ],
                          [ label: "Try Now",  params: "v=1", gaexp: "1" ]]
            ],

            [  label: "CTA After Popup",
               googleOptimizeUrl: "https://optimize.google.com/optimize/home/?authuser=1#/accounts/4705247014/containers/15590944/experiments/6",
               url: "/blog", 
               variants: [[ label: "W/o Popup", params: "v=0", gaexp: "0" ],  
                          [ label: "W Popup",   params: "v=1", gaexp: "1" ]]
            ],

            [  label: "Lead Form Location",
               googleOptimizeUrl: "https://optimize.google.com/optimize/home/?authuser=1#/accounts/4705247014/containers/15590944/experiments/6",
               url: "/some-other-page", 
               variants: [[ label: "Top",      params: "v=0", gaexp: "0" ],  
                          [ label: "Bottom",   params: "v=1", gaexp: "1" ]]
            ]

        ]
]
