return [ experiments: [
            [  label: "Text Color",
               googleOptimizeUrl: "https://optimize.google.com/optimize/home/?authuser=1#/accounts/4705247014/containers/15590944/experiments/6",
               url: "/c", 
               variants: [[ label: "Black", params: "color=black" ],
                          [ label: "Green", params: "color=green" ],  
                          [ label: "Blue",  params: "color=blue" ]]
            ],

            [  label: "CTA After Popup",
               googleOptimizeUrl: "https://optimize.google.com/optimize/home/?authuser=1#/accounts/4705247014/containers/15590944/experiments/6",
               url: "/c", 
               variants: [[ label: "W/o Popup", params: "v=1" ],  
                          [ label: "W Popup",   params: "v=2" ]]
            ]
        ]
]
