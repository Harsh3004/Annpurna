// import React, { useState } from 'react';
// import { BottomNav } from './common/BottomNav';

// // --- SVG Icons ---
// const BackArrowIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
// );
// const CameraIcon = ({className}) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
// );
// const LocationIcon = ({className}) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
// );
// const VolunteerIcon = ({className}) => (
//      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /></svg>
// );
// const CheckCircleIcon = ({className}) => (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
// );


// // --- Main Layout Components ---
// const Header = ({ onBack }) => (
//     <header className="bg-emerald-500 text-white p-4 flex items-center sticky top-0 z-10">
//         {/* <button onClick={onBack} className="mr-4"><BackArrowIcon /></button> */}
//         {/* <h1 className="text-xl font-bold">Donate Food</h1> */}
//     </header>
// );

// const ProgressBar = ({ currentStep }) => {
//     const steps = ["Food Details", "Delivery Mode", "Confirmation"];
//     return (
//         <div className="bg-emerald-500 text-white px-4 pb-3 flex justify-between">
//             {steps.map((step, index) => (
//                 <div key={step} className={`text-center w-1/3 ${index + 1 > currentStep ? 'opacity-50' : ''}`}>
//                     <p className="text-sm font-semibold">{step}</p>
//                     <div className={`mt-1 h-1 rounded-full ${index + 1 <= currentStep ? 'bg-white' : 'bg-white/30'}`}></div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// // --- Form Step Components ---
// const Step1FoodDetails = ({ data, setData, onNext }) => {
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setData(prev => ({ ...prev, [name]: value }));
//     };
    
//     const setCategory = (category) => {
//         setData(prev => ({...prev, category}));
//     }

//     return (
//         <div className="p-6 bg-white rounded-t-2xl -mt-2 relative">
//             <h2 className="text-lg font-bold mb-4">Food Details</h2>
            
//             <div className="space-y-4">
//                 <div>
//                     <label className="text-sm font-medium text-gray-700">Meal Name</label>
//                     <input type="text" name="mealName" value={data.mealName} onChange={handleInputChange} placeholder="e.g., Vegetable Biryani" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"/>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                      <div>
//                         <label className="text-sm font-medium text-gray-700">Meal type</label>
//                         <select name="mealType" value={data.mealType} onChange={handleInputChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
//                             <option>Select type</option>
//                             <option>Breakfast</option>
//                             <option>Lunch</option>
//                             <option>Dinner</option>
//                         </select>
//                     </div>
//                      <div>
//                         <label className="text-sm font-medium text-gray-700">Quantity</label>
//                         <input type="text" name="quantity" value={data.quantity} onChange={handleInputChange} placeholder="e.g., 10 servings" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"/>
//                     </div>
//                 </div>

//                 <div>
//                     <label className="text-sm font-medium text-gray-700">Category</label>
//                     <div className="grid grid-cols-2 gap-4 mt-1">
//                         <button onClick={() => setCategory('Cooked Food')} className={`p-4 border rounded-lg text-center font-semibold ${data.category === 'Cooked Food' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'border-gray-300'}`}>Cooked Food</button>
//                         <button onClick={() => setCategory('Packed Food')} className={`p-4 border rounded-lg text-center font-semibold ${data.category === 'Packed Food' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'border-gray-300'}`}>Packed Food</button>
//                     </div>
//                 </div>
                
//                  <div className="grid grid-cols-2 gap-4">
//                      <div>
//                         <label className="text-sm font-medium text-gray-700">Cooked At</label>
//                         <select name="cookedAt" value={data.cookedAt} onChange={handleInputChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
//                             <option>Select time</option>
//                             <option>7:00 AM</option>
//                             <option>12:00 PM</option>
//                             <option>7:00 PM</option>
//                         </select>
//                     </div>
//                      <div>
//                         <label className="text-sm font-medium text-gray-700">Best Before</label>
//                          <select name="bestBefore" value={data.bestBefore} onChange={handleInputChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
//                             <option>Select time</option>
//                             <option>10:00 AM</option>
//                             <option>3:00 PM</option>
//                             <option>10:00 PM</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div>
//                     <label className="text-sm font-medium text-gray-700">Upload Image</label>
//                     <div className="mt-1 flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg">
//                         <CameraIcon className="h-12 w-12 text-gray-400"/>
//                         <p className="text-gray-500 mt-2">Take a photo of your food</p>
//                         <button className="mt-4 flex items-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-200">
//                             <CameraIcon className="h-4 w-4 mr-2"/>
//                             Take Photo
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <div className="mt-6">
//                 <button onClick={onNext} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-lg hover:bg-emerald-600 transition-colors">
//                     Next: Choose Delivery
//                 </button>
//             </div>
//         </div>
//     );
// };

// const Step2DeliveryMode = ({ data, setData, onNext }) => {
//     const setDeliveryMode = (mode) => {
//         setData(prev => ({...prev, deliveryMode: mode}));
//     }

//     return (
//          <div className="p-6 bg-white rounded-t-2xl -mt-2 relative">
//             <h2 className="text-lg font-bold mb-4">Choose Delivery Mode</h2>
//             <div className="space-y-4">
//                  <button onClick={() => setDeliveryMode('Self Delivery')} className={`w-full p-4 border rounded-lg text-left flex items-center transition-all ${data.deliveryMode === 'Self Delivery' ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300' : 'border-gray-300'}`}>
//                     <LocationIcon className="h-8 w-8 text-blue-500 mr-4"/>
//                     <div>
//                         <p className="font-bold">Self Delivery</p>
//                         <p className="text-sm text-gray-500">Drop food at nearby donation hub</p>
//                     </div>
//                 </button>

//                  <button onClick={() => setDeliveryMode('Volunteer Pickup')} className={`w-full p-4 border rounded-lg text-left flex items-center transition-all ${data.deliveryMode === 'Volunteer Pickup' ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300' : 'border-gray-300'}`}>
//                     <VolunteerIcon className="h-8 w-8 text-green-500 mr-4"/>
//                     <div>
//                         <p className="font-bold">Volunteer Pickup</p>
//                         <p className="text-sm text-gray-500">A volunteer will collect food from your location</p>
//                     </div>
//                     {data.deliveryMode === 'Volunteer Pickup' && <CheckCircleIcon className="h-6 w-6 text-emerald-500 ml-auto" />}
//                 </button>

//                 {data.deliveryMode === 'Volunteer Pickup' && (
//                      <div className="pt-2 animate-fade-in-up">
//                         <label className="text-sm font-medium text-gray-700">Pickup Address</label>
//                         <input type="text" name="pickupAddress" value={data.pickupAddress} onChange={(e) => setData(prev => ({ ...prev, pickupAddress: e.target.value }))} placeholder="Enter your full address" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"/>
//                     </div>
//                 )}
//             </div>
//              <div className="mt-8">
//                 <button onClick={onNext} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-lg hover:bg-emerald-600 transition-colors">
//                     Continue
//                 </button>
//             </div>
//          </div>
//     );
// };


// const Step3Confirmation = ({ data }) => {
//      const donationId = Math.floor(100000 + Math.random() * 900000);
//     return (
//         <div className="p-6 bg-white rounded-t-2xl -mt-2 relative text-center lg:grid lg:grid-cols-2">
//             <div>
//               <h2 className="text-lg font-bold mb-6">Confirmation</h2>
//               <div className="flex justify-center">
//                    <div className="bg-green-100 rounded-full p-4">
//                        <CheckCircleIcon className="h-10 w-10 text-emerald-500"/>
//                    </div>
//               </div>
//               <h3 className="text-2xl font-bold mt-4">Donation Submitted Successfully!</h3>
//               <p className="text-gray-600 mt-2">Your food donation has been registered. A volunteer will contact you shortly for pickup.</p>
//             </div>
        
//             <div className="bg-gray-50 rounded-lg p-4 mt-6 text-left space-y-2 border border-gray-200">
//                 <p><span className="font-bold">Donation ID:</span> #{donationId}</p>
//                 <p><span className="font-bold">Meal:</span> {data.mealName}</p>
//                 <p><span className="font-bold">Quantity:</span> {data.quantity}</p>
//                 <p><span className="font-bold">Type:</span> {data.mealType}</p>
//                 <p><span className="font-bold">Delivery:</span> {data.deliveryMode}</p>
//             </div>
//         </div>
//     );
// };

// export const DonateFood = () => {
//   const [step, setStep] = useState(1);
//     const [formData, setFormData] = useState({
//         mealName: '',
//         mealType: 'Select type',
//         quantity: '',
//         category: 'Cooked Food',
//         cookedAt: 'Select time',
//         bestBefore: 'Select time',
//         deliveryMode: 'Volunteer Pickup',
//         pickupAddress: ''
//     });

//     const handleNext = () => {
//         setStep(prev => prev < 3 ? prev + 1 : prev);
//     };

//     const handleBack = () => {
//         if (step > 1) {
//             setStep(prev => prev - 1);
//         } else {
//             // Logic to go back to the previous screen in your app
//             console.log("Go back to home screen");
//         }
//     };
    
//     const renderStep = () => {
//       switch (step) {
//           case 1:
//               return <Step1FoodDetails data={formData} setData={setFormData} onNext={handleNext} />;
//           case 2:
//               return <Step2DeliveryMode data={formData} setData={setFormData} onNext={handleNext} />;
//           case 3:
//               return <Step3Confirmation data={formData} />;
//           default:
//               return <Step1FoodDetails data={formData} setData={setFormData} onNext={handleNext} />;
//       }
//     }

//     return (
//       <div className="bg-gray-50 min-h-screen font-sans">
//           <div className="max-w-md md:max-w-screen mx-auto bg-gray-100">
//               <Header onBack={handleBack} />
//               <ProgressBar currentStep={step} />
//               <main className='mb-24'>
//                   {renderStep()}
//               </main>
//               <BottomNav />
//                <style>{`
//                   @keyframes fade-in-up {
//                       0% { opacity: 0; transform: translateY(10px); }
//                       100% { opacity: 1; transform: translateY(0); }
//                   }
//                   .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
//               `}</style>
//           </div>
//       </div>
//     );
// }

import React, { useState, useEffect, useRef } from 'react';
import { BottomNav } from './common/BottomNav';

// --- SVG Icons ---
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
);
const CameraIcon = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);
const LocationIcon = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
const VolunteerIcon = ({className}) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /></svg>
);
const CheckCircleIcon = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const PhoneIcon = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);
const MessageIcon = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const StarIcon = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);

// --- Main Layout Components ---
const Header = ({ onBack, title }) => (
    <header className="bg-emerald-500 text-white p-4 flex items-center sticky top-0 z-10">
        {/* <button onClick={onBack} className="mr-4"><BackArrowIcon /></button> */}
        <h1 className="text-xl font-bold">{title}</h1>
    </header>
);

const ProgressBar = ({ currentStep }) => {
    const steps = ["Food Details", "Delivery", "Tracking", "Confirmation"];
    return (
        <div className="bg-emerald-500 text-white px-4 pb-3 flex justify-between">
            {steps.map((step, index) => (
                <div key={step} className={`text-center w-1/${steps.length} ${index + 1 > currentStep ? 'opacity-50' : ''}`}>
                    <p className="text-sm font-semibold">{step}</p>
                    <div className={`mt-1 h-1 rounded-full ${index + 1 <= currentStep ? 'bg-white' : 'bg-white/30'}`}></div>
                </div>
            ))}
        </div>
    );
};

// --- Form Step Components ---
const Step1FoodDetails = ({ data, setData, onNext }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };
    
    const setCategory = (category) => {
        setData(prev => ({...prev, category}));
    }

    return (
        <div className="p-6 bg-white rounded-t-2xl -mt-2 relative">
            <h2 className="text-lg font-bold mb-4">Food Details</h2>
            
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Meal Name</label>
                    <input type="text" name="mealName" value={data.mealName} onChange={handleInputChange} placeholder="e.g., Vegetable Biryani" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="text-sm font-medium text-gray-700">Meal type</label>
                        <select name="mealType" value={data.mealType} onChange={handleInputChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
                            <option>Select type</option>
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
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
                        <button onClick={() => setCategory('Cooked Food')} className={`p-4 border rounded-lg text-center font-semibold ${data.category === 'Cooked Food' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'border-gray-300'}`}>Cooked Food</button>
                        <button onClick={() => setCategory('Packed Food')} className={`p-4 border rounded-lg text-center font-semibold ${data.category === 'Packed Food' ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'border-gray-300'}`}>Packed Food</button>
                    </div>
                </div>
                
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="text-sm font-medium text-gray-700">Cooked At</label>
                        <select name="cookedAt" value={data.cookedAt} onChange={handleInputChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
                            <option>Select time</option>
                            <option>7:00 AM</option>
                            <option>12:00 PM</option>
                            <option>7:00 PM</option>
                        </select>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-700">Best Before</label>
                         <select name="bestBefore" value={data.bestBefore} onChange={handleInputChange} className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
                            <option>Select time</option>
                            <option>10:00 AM</option>
                            <option>3:00 PM</option>
                            <option>10:00 PM</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">Upload Image</label>
                    <div className="mt-1 flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg">
                        <CameraIcon className="h-12 w-12 text-gray-400"/>
                        <p className="text-gray-500 mt-2">Take a photo of your food</p>
                        <button className="mt-4 flex items-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-200">
                            <CameraIcon className="h-4 w-4 mr-2"/>
                            Take Photo
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <button onClick={onNext} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-lg hover:bg-emerald-600 transition-colors">
                    Next: Choose Delivery
                </button>
            </div>
        </div>
    );
};

const Step2DeliveryMode = ({ data, setData, onNext }) => {
    const setDeliveryMode = (mode) => {
        setData(prev => ({...prev, deliveryMode: mode}));
    }

    return (
       <div className="p-6 bg-white rounded-t-2xl -mt-2 relative">
            <h2 className="text-lg font-bold mb-4">Choose Delivery Mode</h2>
            <div className="space-y-4">
                 <button onClick={() => setDeliveryMode('Self Delivery')} className={`w-full p-4 border rounded-lg text-left flex items-center transition-all ${data.deliveryMode === 'Self Delivery' ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300' : 'border-gray-300'}`}>
                    <LocationIcon className="h-8 w-8 text-blue-500 mr-4"/>
                    <div>
                        <p className="font-bold">Self Delivery</p>
                        <p className="text-sm text-gray-500">Drop food at nearby donation hub</p>
                    </div>
                </button>

                 <button onClick={() => setDeliveryMode('Volunteer Pickup')} className={`w-full p-4 border rounded-lg text-left flex items-center transition-all ${data.deliveryMode === 'Volunteer Pickup' ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300' : 'border-gray-300'}`}>
                    <VolunteerIcon className="h-8 w-8 text-green-500 mr-4"/>
                    <div>
                        <p className="font-bold">Volunteer Pickup</p>
                        <p className="text-sm text-gray-500">A volunteer will collect food from your location</p>
                    </div>
                    {data.deliveryMode === 'Volunteer Pickup' && <CheckCircleIcon className="h-6 w-6 text-emerald-500 ml-auto" />}
                </button>

                {data.deliveryMode === 'Volunteer Pickup' && (
                     <div className="pt-2 animate-fade-in-up">
                        <label className="text-sm font-medium text-gray-700">Pickup Address</label>
                        <input type="text" name="pickupAddress" value={data.pickupAddress} onChange={(e) => setData(prev => ({ ...prev, pickupAddress: e.target.value }))} placeholder="Enter your full address" className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"/>
                    </div>
                )}
            </div>
             <div className="mt-8">
                <button onClick={onNext} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-lg hover:bg-emerald-600 transition-colors">
                    Find Volunteer
                </button>
            </div>
       </div>
    );
};

// NEW: Step 3 - Finding a volunteer
const Step3FindingVolunteer = ({ data }) => {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    return (
        <div className="p-6 bg-white rounded-t-2xl -mt-2 relative">
            <div className="text-center py-8">
                <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-emerald-500 rounded-full animate-spin border-t-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center -right-3">
                        <VolunteerIcon className="w-10 h-10 text-emerald-500" />
                    </div>
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

// --- Map Constants (defined outside component to prevent re-creation) ---
const donorLocation = [22.7196, 75.8577]; // Center of Indore
const volunteerPath = [
    [22.7533, 75.8937], // Start point (e.g., Vijay Nagar Square)
    [22.7450, 75.8880],
    [22.7362, 75.8821],
    [22.7280, 75.8755],
    [22.7210, 75.8650],
    donorLocation // End point
];

// UPDATED: Step 4 - Tracking the volunteer with a real map
const Step4Tracking = ({ data, volunteer, onNext }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const volunteerMarkerRef = useRef(null);
    const [pathIndex, setPathIndex] = useState(0);

    // Effect to initialize the map
    useEffect(() => {
        // Ensure Leaflet script is loaded and map is not already initialized
        if (window.L && mapContainerRef.current && !mapRef.current) {
            
            // --- Custom Icons for the map markers ---
            const volunteerIcon = new window.L.icon({ // FIX: L.icon is lowercase
                iconUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fill="#3b82f6" d="M12,2A6,6,0,0,0,6,8c0,4.42,6,13,6,13s6-8.58,6-13A6,6,0,0,0,12,2Zm0,8a2,2,0,1,1,2-2A2,2,0,0,1,12,10Z"/><circle fill="white" cx="12" cy="8" r="1.5"/></svg>'),
                iconSize: [36, 36],
                iconAnchor: [18, 36],
                popupAnchor: [0, -36]
            });
            const donorIcon = new window.L.icon({ // FIX: L.icon is lowercase
                iconUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fill="#10b981" d="M12,3,2,12H5v9H19V12h3ZM17,19H15V13H9v6H7V10.19l5-4.5,5,4.5Z"/></svg>'),
                iconSize: [36, 36],
                iconAnchor: [18, 18]
            });

            mapRef.current = window.L.map(mapContainerRef.current).setView(donorLocation, 13);
            
            window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);

            // Add markers for donor and volunteer
            window.L.marker(donorLocation, {icon: donorIcon}).addTo(mapRef.current).bindPopup("<b>Your Location</b><br>" + data.pickupAddress);
            volunteerMarkerRef.current = window.L.marker(volunteerPath[0], {icon: volunteerIcon}).addTo(mapRef.current).bindPopup(`<b>${volunteer.name}</b>`);
            
            // Draw the route on the map
            const routeLine = window.L.polyline(volunteerPath, {color: '#3b82f6', dashArray: '5, 10'}).addTo(mapRef.current);
            mapRef.current.fitBounds(routeLine.getBounds().pad(0.2));
        }

        // Cleanup function for when component unmounts
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [data.pickupAddress, volunteer.name]); // Rerun if these details change

    // Effect to simulate volunteer movement along the path
    useEffect(() => {
        const moveVolunteer = setInterval(() => {
            setPathIndex(prevIndex => {
                const nextIndex = prevIndex + 1;
                if (nextIndex < volunteerPath.length && volunteerMarkerRef.current) {
                    const newPosition = volunteerPath[nextIndex];
                    volunteerMarkerRef.current.setLatLng(newPosition);
                    mapRef.current.panTo(newPosition, { animate: true, duration: 1.5 });
                    return nextIndex;
                }
                clearInterval(moveVolunteer); // Stop when destination is reached
                return prevIndex;
            });
        }, 2500); // Move every 2.5 seconds

        return () => clearInterval(moveVolunteer); // Cleanup on unmount
    }, []); // OPTIMIZATION: Empty dependency array as path is constant


    return (
        <div className="p-6 bg-white rounded-t-2xl -mt-2 relative">
            <div className="bg-orange-100 border border-orange-200 text-orange-800 p-4 rounded-lg text-center mb-6">
                <h2 className="font-bold text-lg">Volunteer is on the way!</h2>
                <p className="text-sm">Your volunteer will arrive shortly.</p>
            </div>

            <div className="bg-white rounded-lg p-4 mb-6 shadow-md border">
                <div className="flex items-center">
                    <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xl mr-4">
                        {volunteer.avatar}
                    </div>
                    <div className="flex-grow">
                        <p className="font-bold text-lg">{volunteer.name}</p>
                        <p className="text-gray-500">{volunteer.vehicle}</p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center justify-end text-yellow-500 mb-1">
                            <StarIcon className="w-5 h-5" />
                            <span className="font-bold ml-1">{volunteer.rating}</span>
                        </div>
                        <p className="font-bold text-emerald-600">ETA {volunteer.eta} mins</p>
                         <p className="text-xs text-gray-400">to pickup</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <button className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg font-semibold hover:bg-gray-200">
                        <PhoneIcon className="w-5 h-5 mr-2"/> Call
                    </button>
                    <button className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg font-semibold hover:bg-gray-200">
                        <MessageIcon className="w-5 h-5 mr-2"/> Message
                    </button>
                </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border relative h-80 overflow-hidden">
                 <h3 className="font-bold mb-2 flex items-center"><div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>Live tracking</h3>
                 {/* Real Map Container */}
                 <div ref={mapContainerRef} className="absolute top-12 left-0 right-0 bottom-0 rounded-b-lg" style={{ zIndex: 0 }}></div>
            </div>
            
            <div className="mt-6">
                <button onClick={onNext} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-lg hover:bg-emerald-600 transition-colors">
                   Mark as Completed
                </button>
            </div>
        </div>
    );
};


const Step5Confirmation = ({ data }) => {
    const donationId = Math.floor(100000 + Math.random() * 900000);
    return (
        <div className="p-6 bg-white rounded-t-2xl -mt-2 relative text-center">
            <div>
              <h2 className="text-lg font-bold mb-6">Confirmation</h2>
              <div className="flex justify-center">
                   <div className="bg-green-100 rounded-full p-4">
                       <CheckCircleIcon className="h-10 w-10 text-emerald-500"/>
                   </div>
              </div>
              <h3 className="text-2xl font-bold mt-4">Donation Submitted Successfully!</h3>
              <p className="text-gray-600 mt-2">Thank you for your generous contribution. You've made a difference!</p>
            </div>
        
            <div className="bg-gray-50 rounded-lg p-4 mt-6 text-left space-y-2 border border-gray-200">
                <p><span className="font-bold">Donation ID:</span> #{donationId}</p>
                <p><span className="font-bold">Meal:</span> {data.mealName}</p>
                <p><span className="font-bold">Quantity:</span> {data.quantity}</p>
                <p><span className="font-bold">Type:</span> {data.mealType}</p>
                <p><span className="font-bold">Delivery:</span> {data.deliveryMode}</p>
            </div>
        </div>
    );
};

export const DonateFood = () => {
  const [progressStep, setProgressStep] = useState(1);
  const [view, setView] = useState('details'); // 'details', 'delivery', 'finding', 'tracking', 'confirmation'
  const [volunteer, setVolunteer] = useState(null);

  const [formData, setFormData] = useState({
        mealName: 'Vegetable Biryani',
        mealType: 'Lunch',
        quantity: '12 Plates',
        category: 'Cooked Food',
        cookedAt: '12:00 PM',
        bestBefore: '3:00 PM',
        deliveryMode: 'Volunteer Pickup',
        pickupAddress: '123, Vijay Nagar, Indore'
    });
    
    // This effect simulates finding a volunteer
    useEffect(() => {
        if (view === 'finding') {
            const timer = setTimeout(() => {
                // Assign a mock volunteer
                setVolunteer({
                    name: 'Priya Sharma',
                    vehicle: 'Honda Activa',
                    rating: 4.8,
                    eta: 12,
                    avatar: 'PS'
                });
                // Move to the tracking view
                setView('tracking');
            }, 5000); // 5-second delay to simulate search

            return () => clearTimeout(timer); // Cleanup timer on component unmount
        }
    }, [view]);

    const handleBack = () => {
        if (view === 'delivery') {
            setView('details');
            setProgressStep(1);
        } else if (view === 'details') {
            console.log("Go back to home screen");
        }
        // Cannot go back from tracking or confirmation in this flow
    };
    
    const renderView = () => {
      switch (view) {
          case 'details':
              return <Step1FoodDetails 
                          data={formData} 
                          setData={setFormData} 
                          onNext={() => { setView('delivery'); setProgressStep(2); }} 
                      />;
          case 'delivery':
              return <Step2DeliveryMode 
                          data={formData} 
                          setData={setFormData} 
                          onNext={() => { setView('finding'); setProgressStep(3); }} 
                      />;
          case 'finding':
              return <Step3FindingVolunteer data={formData} />;
          case 'tracking':
              return <Step4Tracking 
                          data={formData} 
                          volunteer={volunteer} 
                          onNext={() => { setView('confirmation'); setProgressStep(4); }} 
                      />;
          case 'confirmation':
              return <Step5Confirmation data={formData} />;
          default:
              return <Step1FoodDetails 
                          data={formData} 
                          setData={setFormData} 
                          onNext={() => { setView('delivery'); setProgressStep(2); }} 
                      />;
      }
    }

    return (
      <div className="bg-gray-50 min-h-screen font-sans">
          <div className="max-w-md lg:max-w-screen mx-auto bg-gray-100">
              <Header onBack={handleBack} title="Donate Food" />
              <ProgressBar currentStep={progressStep} />
              <main className='pb-24'>
                  {renderView()}
              </main>
              <BottomNav />
               <style>{`
                  @keyframes fade-in-up {
                      0% { opacity: 0; transform: translateY(10px); }
                      100% { opacity: 1; transform: translateY(0); }
                  }
                  .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
                  
                  @keyframes drive {
                      0% { transform: translate(0, 0) scale(1); }
                      50% { transform: translate(120px, 60px) scale(1.1); }
                      100% { transform: translate(200px, 120px) scale(1); }
                  }
                  .animate-drive {
                      animation: drive 8s ease-in-out infinite;
                      transform-origin: center;
                  }
              `}</style>
          </div>
      </div>
    );
}

export default DonateFood;

