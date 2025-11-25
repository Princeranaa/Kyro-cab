function LocationPanel({  setVehiclePanleOpen,setPanelOpen }) {
    

    const locations = [
        "Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Dubai, UAE",
        "Taj Mahal, Dharmapuri, Forest Colony, Agra, Uttar Pradesh 282001, India",
        "Gateway of India, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001, India",
        "Charminar, Ghansi Bazaar, Hyderabad, Telangana 500002, India",
        "MG Road, Bengaluru, Karnataka 560001, India",
        "Sector 18 Market, Noida, Uttar Pradesh 201301, India",
        "Connaught Place, New Delhi, Delhi 110001, India",
        "Park Street, Kolkata, West Bengal 700016, India",
        "Camp Area, Pune, Maharashtra 411001, India"
    ];


    const vehicalPanle = () => {
        setVehiclePanleOpen(true);
        setPanelOpen(false)
    }


    return (
        <div className="overflow-auto h-full">
            {/* this is the sample data */}
            {
                locations.map((location,index) => {
                    return <div onClick={vehicalPanle} key={index} className="flex items-center justify-start my-2 border-white active:border-black gap-2 border-2 p-1 rounded-md">
                        <h2 className="bg-[#eee] p-2 rounded-full h-8 w-12 flex items-center justify-center"><i className="ri-map-pin-fill"></i></h2>
                        <h4 className="font-medium">{location}</h4>
                    </div>
                })
            }

        </div>
    );
}


export default LocationPanel