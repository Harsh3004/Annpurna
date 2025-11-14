import React, { useState, useEffect, useRef } from 'react';

// A custom hook to dynamically load scripts like Leaflet.js
const useScript = (url, cssUrl) => {
    const [status, setStatus] = useState(url ? "loading" : "idle");

    useEffect(() => {
        if (!url) {
            setStatus("idle");
            return;
        }

        let script = document.querySelector(`script[src="${url}"]`);
        let link = document.querySelector(`link[href="${cssUrl}"]`);

        if (!script) {
            script = document.createElement("script");
            script.src = url;
            script.async = true;
            script.setAttribute("data-status", "loading");
            document.body.appendChild(script);

            const setAttributeFromEvent = (event) => {
                script.setAttribute("data-status", event.type === "load" ? "ready" : "error");
            };
            script.addEventListener("load", setAttributeFromEvent);
            script.addEventListener("error", setAttributeFromEvent);
        }
        
        if (cssUrl && !link) {
            link = document.createElement("link");
            link.href = cssUrl;
            link.rel = "stylesheet";
            document.head.appendChild(link);
        }

        const setStateStatus = () => {
             const currentStatus = script.getAttribute("data-status");
             if(currentStatus === 'ready' && (!cssUrl || link)){
                 setStatus("ready");
             } else if (currentStatus === 'error'){
                 setStatus("error")
             }
        };
        
        if (script.getAttribute("data-status") === "ready") {
             setStateStatus();
        } else {
            script.addEventListener("load", setStateStatus);
            script.addEventListener("error", setStateStatus);
        }

        return () => {
            if (script) {
                script.removeEventListener("load", setStateStatus);
                script.removeEventListener("error", setStateStatus);
            }
        };
    }, [url, cssUrl]);

    return status;
};

// --- SVG Icons ---
const LocationIcon = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>);
const VolunteerIcon = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /></svg>);
const CheckCircleIcon = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
const PhoneIcon = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>);
const MessageIcon = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>);
const StarIcon = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>);
const UploadIcon = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>);
const TrashIcon = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>);
const EditIcon = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>);
const DirectionsIcon = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>);
const ClockIcon = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);

// --- Main Layout Components ---
const Header = ({ title }) => (
    <header className="rounded-t-[32px] border-b border-white/60 bg-brand-600/95 px-6 py-6 text-white">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mt-1 text-sm text-white/80">Guide surplus meals from your kitchen to the closest hunger spot.</p>
    </header>
);
const ProgressBar = ({ steps, currentStep }) => (
    <div className="flex flex-wrap gap-6 border-b border-white/70 bg-white/70 px-6 py-4 text-sm font-semibold text-brand-700">
        {steps.map((step, index) => (
            <div key={step} className={`inline-flex flex-col items-start pr-6 ${index + 1 > currentStep ? 'opacity-40' : ''}`}>
                <span className="uppercase tracking-wide text-xs">Step {index + 1}</span>
                <p className="text-sm font-semibold">{step}</p>
                <div className="mt-2 h-1 w-24 rounded-full bg-brand-100">
                    <div className={`h-full rounded-full bg-brand-600 transition-all ${index + 1 <= currentStep ? 'w-full' : 'w-0'}`}></div>
                </div>
            </div>
        ))}
    </div>
);

// --- Form Step Components ---
const Step1FoodDetails = ({ data, setData, onNext }) => {
    const fileInputRef = useRef(null);
    const handleInputChange = (e) => setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const setCategory = (category) => setData(prev => ({...prev, category}));
    const handleUploadClick = () => fileInputRef.current.click();
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setData(prev => ({ ...prev, image: e.target.result }));
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-6 bg-white rounded-t-2xl -mt-2 relative">
            <h2 className="text-lg font-bold mb-4">Food Details</h2>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden"/>
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Meal Name</label>
                    <input type="text" name="mealName" value={data.mealName} onChange={handleInputChange} placeholder="e.g., Vegetable Biryani" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Meal type</label>
                        <select name="mealType" value={data.mealType} onChange={handleInputChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
                            <option>Select type</option><option>Breakfast</option><option>Lunch</option><option>Dinner</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Quantity</label>
                        <input type="text" name="quantity" value={data.quantity} onChange={handleInputChange} placeholder="e.g., 10 servings" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"/>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <div className="grid grid-cols-2 gap-4 mt-1">
                        <button type="button" onClick={() => setCategory('Cooked Food')} className={`p-4 border rounded-lg text-center font-semibold ${data.category === 'Cooked Food' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'border-gray-300'}`}>Cooked Food</button>
                        <button type="button" onClick={() => setCategory('Packed Food')} className={`p-4 border rounded-lg text-center font-semibold ${data.category === 'Packed Food' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'border-gray-300'}`}>Packed Food</button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Cooked At</label>
                        <select name="cookedAt" value={data.cookedAt} onChange={handleInputChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
                            <option>Select time</option><option>7:00 AM</option><option>12:00 PM</option><option>7:00 PM</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Best Before</label>
                         <select name="bestBefore" value={data.bestBefore} onChange={handleInputChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
                            <option>Select time</option><option>10:00 AM</option><option>3:00 PM</option><option>10:00 PM</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Upload Image</label>
                    {data.image ? (
                        <div className="mt-1 relative">
                            <img src={data.image} alt="Food donation" className="w-full h-48 object-cover rounded-lg shadow-inner"/>
                            <div className="absolute top-2 right-2 flex space-x-2">
                                <button type="button" onClick={handleUploadClick} className="bg-white/80 backdrop-blur-sm text-gray-800 p-2 rounded-full shadow-lg hover:bg-white transition-all"><EditIcon className="w-5 h-5"/></button>
                                <button type="button" onClick={() => setData(prev => ({...prev, image: null}))} className="bg-red-500/80 backdrop-blur-sm text-white p-2 rounded-full shadow-lg hover:bg-red-500 transition-all"><TrashIcon className="w-5 h-5"/></button>
                            </div>
                        </div>
                    ) : (
                        <button type="button" onClick={handleUploadClick} className="mt-1 flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <UploadIcon className="h-12 w-12 text-gray-400"/>
                            <p className="text-gray-500 mt-2">Select an image of your food</p>
                            <div className="mt-4 flex items-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold"><UploadIcon className="h-4 w-4 mr-2"/>Upload Image</div>
                        </button>
                    )}
                </div>
            </div>
            <div className="mt-6"><button onClick={onNext} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-lg hover:bg-emerald-600 transition-colors">Next: Choose Delivery</button></div>
        </div>
    );
};
const Step2DeliveryMode = ({ data, setData, onNext }) => {
    const setDeliveryMode = (mode) => {
        setData(prev => ({...prev, deliveryMode: mode}));
    };

    return (
        <div className="p-6 bg-white rounded-t-2xl -mt-2 relative">
            <h2 className="text-lg font-bold mb-4">Choose Delivery Mode</h2>
            <div className="space-y-4">
                 <button onClick={() => setDeliveryMode('Self Delivery')} className={`w-full p-4 border rounded-lg text-left flex items-center transition-all ${data.deliveryMode === 'Self Delivery' ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300' : 'border-gray-300'}`}>
                    <LocationIcon className="h-8 w-8 text-blue-500 mr-4"/>
                    <div><p className="font-bold">Self Delivery</p><p className="text-sm text-gray-500">Drop food at nearby donation hub</p></div>
                </button>
                 <button onClick={() => setDeliveryMode('Volunteer Pickup')} className={`w-full p-4 border rounded-lg text-left flex items-center transition-all ${data.deliveryMode === 'Volunteer Pickup' ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300' : 'border-gray-300'}`}>
                    <VolunteerIcon className="h-8 w-8 text-green-500 mr-4"/>
                    <div><p className="font-bold">Volunteer Pickup</p><p className="text-sm text-gray-500">A volunteer will collect food from your location</p></div>
                </button>

                {data.deliveryMode === 'Volunteer Pickup' && (
                    <div className="pt-2 animate-fade-in-up">
                        <label className="text-sm font-medium text-gray-700">Pickup Address</label>
                        <input 
                            type="text" 
                            name="pickupAddress" 
                            value={data.pickupAddress} 
                            onChange={(e) => setData(prev => ({ ...prev, pickupAddress: e.target.value }))} 
                            placeholder="Enter your full address" 
                            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"/>
                    </div>
                )}
            </div>
            <div className="mt-8">
                <button 
                    onClick={() => onNext(data.deliveryMode)} 
                    className="w-full bg-emerald-500 text-white font-bold py-4 rounded-lg hover:bg-emerald-600 transition-colors disabled:bg-gray-300"
                    disabled={!data.deliveryMode}
                >
                    {data.deliveryMode === 'Volunteer Pickup' ? 'Find Volunteer' : 'Continue'}
                </button>
            </div>
       </div>
    );
};


// --- NEW SELF-DELIVERY FLOW COMPONENTS ---
const hungerSpotsData = [
    {id:1, name:"Seva Foundation Center", rating:4.8, donations:1250, address:"123 MG Road, Indore", description:"Community center serving underprivileged families", distance:"0.8 km", timeAway:"3 mins", status:"Open until 10:00 PM", isOpen:true, latlng:[22.7196, 75.8577]},
    {id:2, name:"Annapurna Food Bank", rating:4.7, donations:980, address:"456 Brigade Road, Indore", description:"Food bank distributing meals to homeless individuals", distance:"1.2 km", timeAway:"5 mins", status:"Open until 9:00 PM", isOpen:true, latlng:[22.725, 75.865]},
    {id:3, name:"Hope Kitchen", rating:4.6, donations:756, address:"789 Commercial Street, Indore", description:"Community kitchen for daily meal distribution", distance:"1.5 km", timeAway:"6 mins", status:"Open until 8:30 PM", isOpen:true, latlng:[22.710, 75.850]},
    {id:4, name:"Salvation Army Center", rating:4.5, donations:623, address:"321 Church Street, Indore", description:"Homeless shelter and food distribution center", distance:"2.1 km", timeAway:"8 mins", status:"Closed (Opens 6:00 AM)", isOpen:false, latlng:[22.730, 75.880]},
];

const MapView = ({ center, markers, onMapReady }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const leafletStatus = useScript('https://unpkg.com/leaflet@1.7.1/dist/leaflet.js', 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css');

    useEffect(() => {
        if (leafletStatus !== 'ready' || !mapContainerRef.current || mapRef.current) return;

        const map = window.L.map(mapContainerRef.current).setView(center, 14);
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        
        markers.forEach(({position, iconUrl, popupText}) => {
             const icon = new window.L.Icon({
                iconUrl: 'data:image/svg+xml;base64,' + btoa(iconUrl),
                iconSize: [32, 32], 
                iconAnchor: [16, 32]
            });
             window.L.marker(position, { icon }).addTo(map).bindPopup(popupText);
        })
        
        mapRef.current = map;
        if(onMapReady) onMapReady(map);

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [leafletStatus, center, markers, onMapReady]);
    
    if(leafletStatus === 'loading') return <div className="flex items-center justify-center h-full"><p>Loading Map...</p></div>
    if(leafletStatus === 'error') return <div className="flex items-center justify-center h-full"><p>Error loading map.</p></div>

    return <div ref={mapContainerRef} className="w-full h-full" />;
}

const Step3HungerSpots = ({ onBack, onConfirm }) => {
    const [selectedSpot, setSelectedSpot] = useState(null);
    const mapRef = useRef(null);
    
    const markers = hungerSpotsData.map(spot => ({
        position: spot.latlng,
        popupText: `<b>${spot.name}</b>`,
        iconUrl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="#ef4444"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>'
    }));

    const handleSelectSpot = (spot) => {
        setSelectedSpot(spot);
        if (mapRef.current) {
            mapRef.current.setView(spot.latlng, 15, { animate: true });
        }
    };

    return (
        <div className="p-6 bg-white rounded-t-2xl -mt-2 relative">
            <div className="relative h-60 rounded-xl overflow-hidden mb-4 border -mx-6 -mt-2">
                <MapView center={[22.7196, 75.8577]} markers={markers} onMapReady={(map) => mapRef.current = map} />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg flex items-center">
                    <LocationIcon className="w-6 h-6 text-emerald-500 mr-2" />
                    <div>
                        <p className="font-bold text-gray-800">Nearby Hunger Spots</p>
                        <p className="text-xs text-gray-500">Found {hungerSpotsData.length} spots within 3km</p>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {hungerSpotsData.map(spot => (
                    <button key={spot.id} onClick={() => handleSelectSpot(spot)} className={`w-full p-4 border rounded-lg text-left transition-all ${selectedSpot?.id === spot.id ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300' : 'border-gray-200'}`}>
                        <div className="flex justify-between items-start">
                           <div>
                                <h3 className="font-bold text-lg text-gray-800">{spot.name}</h3>
                                <p className="text-sm text-gray-500">{spot.address}</p>
                           </div>
                           <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                                <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                                <span className="font-semibold">{spot.rating}</span>
                           </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{spot.description}</p>
                        <div className="flex items-center justify-between mt-3 text-sm">
                            <div className="flex items-center space-x-4">
                                <span className="flex items-center font-semibold text-blue-600"><DirectionsIcon className="w-4 h-4 mr-1.5"/>{spot.distance}</span>
                                <span className={`flex items-center font-semibold ${spot.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                                    <ClockIcon className="w-4 h-4 mr-1.5"/>{spot.status}
                                </span>
                            </div>
                            <PhoneIcon className="w-5 h-5 text-gray-500"/>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-6">
                <button onClick={() => onConfirm(selectedSpot)} disabled={!selectedSpot} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-lg hover:bg-emerald-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
                    {selectedSpot ? `Confirm Drop-off at ${selectedSpot.name}` : 'Select a Hunger Spot'}
                </button>
                <button onClick={onBack} className="w-full mt-2 bg-transparent text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-100">Back to Delivery Options</button>
            </div>
        </div>
    );
};
const Step4SelfDeliveryConfirmation = ({ data, spot }) => (
    <div className="p-6 bg-white rounded-t-2xl -mt-2 relative text-center">
        <CheckCircleIcon className="h-16 w-16 text-emerald-500 mx-auto bg-green-100 rounded-full p-3"/>
        <h3 className="text-2xl font-bold mt-4">Donation Ready for Drop-off!</h3>
        <p className="text-gray-600 mt-2">Please drop off your donation at your selected location. Thank you for your kindness!</p>
        <div className="bg-gray-50 rounded-lg p-4 mt-6 text-left space-y-3 border border-gray-200">
            <div><p className="font-bold text-gray-700">Selected Hunger Spot:</p><p className="text-gray-600">{spot.name}, {spot.address}</p></div>
            <hr/>
            <div><p className="font-bold text-gray-700">Your Donation:</p><p className="text-gray-600">{data.quantity} of {data.mealName}</p></div>
        </div>
    </div>
);

// --- VOLUNTEER FLOW COMPONENTS ---
const Step4FindingVolunteer = ({ data }) => {
    const [countdown, setCountdown] = useState(5);
    useEffect(() => { if (countdown > 0) setTimeout(() => setCountdown(countdown - 1), 1000) }, [countdown]);
    return (
        <div className="p-6 bg-white rounded-t-2xl -mt-2 relative">
            <div className="text-center py-8">
                <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-emerald-500 rounded-full animate-spin border-t-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center -right-3"><VolunteerIcon className="w-10 h-10 text-emerald-500" /></div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Finding a volunteer...</h2>
                <p className="text-gray-500 mt-2">We're connecting you with nearby volunteers</p>
                <p className="text-gray-400 mt-1 text-sm">Searching for {countdown}s...</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mt-6 text-left space-y-2 border border-gray-200">
                <h3 className="font-bold text-gray-700 mb-2">Donation Details</h3>
                <p><span className="font-semibold text-gray-600">Meal:</span> {data.mealName}</p>
                <p><span className="font-semibold text-gray-600">Quantity:</span> {data.quantity}</p>
                <p><span className="font-semibold text-gray-600">Pickup Address:</span> {data.pickupAddress}</p>
            </div>
        </div>
    );
};
const Step5Tracking = ({ volunteer, onNext }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const leafletStatus = useScript('https://unpkg.com/leaflet@1.7.1/dist/leaflet.js', 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css');
    
    useEffect(() => {
        if (leafletStatus !== 'ready' || !mapContainerRef.current || mapRef.current || !volunteer) return;
        
        const donorLocation = [22.7196, 75.8577];
        const volunteerPath = [[22.7533, 75.8937], [22.7450, 75.8880], [22.7362, 75.8821], [22.7280, 75.8755], [22.7210, 75.8650], donorLocation];
        
        const map = window.L.map(mapContainerRef.current).setView(donorLocation, 13);
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        
        const volunteerIcon = new window.L.Icon({iconUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fill="#3b82f6" d="M12,2A6,6,0,0,0,6,8c0,4.42,6,13,6,13s6-8.58,6-13A6,6,0,0,0,12,2Zm0,8a2,2,0,1,1,2-2A2,2,0,0,1,12,10Z"/><circle fill="white" cx="12" cy="8" r="1.5"/></svg>'), iconSize:[36,36], iconAnchor:[18,36]});
        const donorIcon = new window.L.Icon({iconUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fill="#10b981" d="M12,3,2,12H5v9H19V12h3ZM17,19H15V13H9v6H7V10.19l5-4.5,5,4.5Z"/></svg>'), iconSize:[36,36], iconAnchor:[18,18]});
        
        window.L.marker(donorLocation, {icon: donorIcon}).addTo(map).bindPopup("<b>Your Location</b>");
        const volunteerMarker = window.L.marker(volunteerPath[0], {icon: volunteerIcon}).addTo(map).bindPopup(`<b>${volunteer.name}</b>`);
        
        const routeLine = window.L.polyline(volunteerPath, {color: '#3b82f6', dashArray: '5, 10'}).addTo(map);
        map.fitBounds(routeLine.getBounds().pad(0.2));
        
        mapRef.current = map;
        
        let pathIndex = 0;
        const moveInterval = setInterval(() => {
            pathIndex++;
            if (pathIndex < volunteerPath.length && volunteerMarker && mapRef.current) {
                volunteerMarker.setLatLng(volunteerPath[pathIndex]);
                mapRef.current.panTo(volunteerPath[pathIndex], { animate: true, duration: 1.5 });
            } else { 
                clearInterval(moveInterval); 
            }
        }, 2500);
        
        return () => { 
            clearInterval(moveInterval); 
            if (mapRef.current) { 
                mapRef.current.remove(); 
                mapRef.current = null; 
            }
        };
    }, [leafletStatus, volunteer]);

    return (
        <div className="p-6 bg-white rounded-t-2xl -mt-2 relative">
            <div className="bg-orange-100 border border-orange-200 text-orange-800 p-4 rounded-lg text-center mb-6"><h2 className="font-bold text-lg">Volunteer is on the way!</h2><p className="text-sm">Your volunteer will arrive shortly.</p></div>
            <div className="bg-white rounded-lg p-4 mb-6 shadow-md border">
                <div className="flex items-center">
                    <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">{volunteer.avatar}</div>
                    <div className="flex-grow"><p className="font-bold text-lg">{volunteer.name}</p><p className="text-gray-500">{volunteer.vehicle}</p></div>
                    <div className="text-right"><div className="flex items-center justify-end text-yellow-500 mb-1"><StarIcon className="w-5 h-5" /><span className="font-bold ml-1">{volunteer.rating}</span></div><p className="font-bold text-emerald-600">ETA {volunteer.eta} mins</p><p className="text-xs text-gray-400">to pickup</p></div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4"><button className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg font-semibold hover:bg-gray-200"><PhoneIcon className="w-5 h-5 mr-2"/> Call</button><button className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg font-semibold hover:bg-gray-200"><MessageIcon className="w-5 h-5 mr-2"/> Message</button></div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border relative h-80 overflow-hidden">
                <h3 className="font-bold mb-2 flex items-center"><div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>Live tracking</h3>
                <div ref={mapContainerRef} className="absolute top-12 left-0 right-0 bottom-0 rounded-b-lg" style={{ zIndex: 0 }}>
                    {leafletStatus === 'loading' && <div className="flex items-center justify-center h-full"><p>Loading Map...</p></div>}
                    {leafletStatus === 'error' && <div className="flex items-center justify-center h-full"><p>Error loading map.</p></div>}
                </div>
            </div>
            <div className="mt-6"><button onClick={onNext} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-lg hover:bg-emerald-600">Mark as Completed</button></div>
        </div>
    );
};
const Step6VolunteerConfirmation = ({ data }) => (
    <div className="p-6 bg-white rounded-t-2xl -mt-2 relative text-center">
        <CheckCircleIcon className="h-16 w-16 text-emerald-500 mx-auto bg-green-100 rounded-full p-3"/>
        <h3 className="text-2xl font-bold mt-4">Donation Submitted Successfully!</h3>
        <p className="text-gray-600 mt-2">A volunteer has been assigned. Thank you for making a difference!</p>
        <div className="bg-gray-50 rounded-lg p-4 mt-6 text-left space-y-2 border border-gray-200">
            <p><span className="font-bold">Donation ID:</span> #{Math.floor(100000 + Math.random() * 900000)}</p>
            <p><span className="font-bold">Meal:</span> {data.mealName}</p><p><span className="font-bold">Quantity:</span> {data.quantity}</p>
            <p><span className="font-bold">Delivery:</span> {data.deliveryMode}</p>
        </div>
    </div>
);

// --- MAIN COMPONENT & FLOW LOGIC ---
export const DonateFood = () => {
    const [view, setView] = useState('details');
    const [progress, setProgress] = useState({ steps: ["Details", "Delivery"], current: 1 });
    const [volunteer, setVolunteer] = useState(null);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [formData, setFormData] = useState({
        mealName: 'Vegetable Biryani', mealType: 'Lunch', quantity: '12 Plates', category: 'Cooked Food',
        cookedAt: '12:00 PM', bestBefore: '3:00 PM', image: null, deliveryMode: null,
        pickupAddress: '123, Vijay Nagar, Indore'
    });
    
    useEffect(() => {
        if (view === 'finding') {
            const timer = setTimeout(() => {
                setVolunteer({ name: 'Priya Sharma', vehicle: 'Honda Activa', rating: 4.8, eta: 12, avatar: 'PS' });
                setView('tracking');
                setProgress(p => ({ ...p, current: 3 }));
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [view]);

    const handleDeliveryNext = (mode) => {
        if (mode === 'Self Delivery') {
            setProgress({ steps: ["Details", "Delivery", "Location", "Confirm"], current: 3 });
            setView('hungerSpots');
        } else {
            setProgress({ steps: ["Details", "Delivery", "Tracking", "Confirm"], current: 3 });
            setView('finding');
        }
    };
    
    const renderView = () => {
      switch (view) {
          case 'details':
              return <Step1FoodDetails data={formData} setData={setFormData} onNext={() => { setView('delivery'); setProgress(p => ({ ...p, current: 2 })); }}/>;
          case 'delivery':
              return <Step2DeliveryMode data={formData} setData={setFormData} onNext={handleDeliveryNext} />;
          // Self-Delivery Path
          case 'hungerSpots':
              return <Step3HungerSpots onBack={() => { setView('delivery'); setProgress({ steps: ["Details", "Delivery"], current: 2 }); }} onConfirm={(spot) => { setSelectedSpot(spot); setView('selfDeliveryConfirmation'); setProgress(p => ({ ...p, current: 4 })); }} />;
          case 'selfDeliveryConfirmation':
              return <Step4SelfDeliveryConfirmation data={formData} spot={selectedSpot} />;
          // Volunteer Path
          case 'finding':
              return <Step4FindingVolunteer data={formData} />;
          case 'tracking':
              return <Step5Tracking volunteer={volunteer} onNext={() => { setView('volunteerConfirmation'); setProgress(p => ({ ...p, current: 4 })); }} />;
          case 'volunteerConfirmation':
              return <Step6VolunteerConfirmation data={formData} />;
          default:
              return <Step1FoodDetails data={formData} setData={setFormData} onNext={() => setView('delivery')} />;
      }
    }

    return (
      <div className="bg-gray-50 min-h-screen font-sans">
          <div className="mx-auto max-w-5xl rounded-[32px] border border-white/70 bg-white/85 shadow-[0_32px_90px_-55px_rgba(12,80,58,0.5)] backdrop-blur">
                  <Header title="Donate Food" />
                  <ProgressBar steps={progress.steps} currentStep={progress.current} />
                  <main className='pb-12 px-4 sm:px-8'>{renderView()}</main>
                  <style>{`.animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; } @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); }}`}</style>
              </div>
      </div>
    );
}

export default DonateFood;

