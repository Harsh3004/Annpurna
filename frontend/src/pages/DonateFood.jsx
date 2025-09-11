import React, { useState } from 'react';
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


// --- Main Layout Components ---
const Header = ({ onBack }) => (
    <header className="bg-emerald-500 text-white p-4 flex items-center sticky top-0 z-10">
        <button onClick={onBack} className="mr-4"><BackArrowIcon /></button>
        <h1 className="text-xl font-bold">Donate Food</h1>
    </header>
);

const ProgressBar = ({ currentStep }) => {
    const steps = ["Food Details", "Delivery Mode", "Confirmation"];
    return (
        <div className="bg-emerald-500 text-white px-4 pb-3 flex justify-between">
            {steps.map((step, index) => (
                <div key={step} className={`text-center w-1/3 ${index + 1 > currentStep ? 'opacity-50' : ''}`}>
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
                    Continue
                </button>
            </div>
         </div>
    );
};


const Step3Confirmation = ({ data }) => {
     const donationId = Math.floor(100000 + Math.random() * 900000);
    return (
        <div className="p-6 bg-white rounded-t-2xl -mt-2 relative text-center lg:grid lg:grid-cols-2">
            <div>
              <h2 className="text-lg font-bold mb-6">Confirmation</h2>
              <div className="flex justify-center">
                   <div className="bg-green-100 rounded-full p-4">
                       <CheckCircleIcon className="h-10 w-10 text-emerald-500"/>
                   </div>
              </div>
              <h3 className="text-2xl font-bold mt-4">Donation Submitted Successfully!</h3>
              <p className="text-gray-600 mt-2">Your food donation has been registered. A volunteer will contact you shortly for pickup.</p>
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
  const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        mealName: '',
        mealType: 'Select type',
        quantity: '',
        category: 'Cooked Food',
        cookedAt: 'Select time',
        bestBefore: 'Select time',
        deliveryMode: 'Volunteer Pickup',
        pickupAddress: ''
    });

    const handleNext = () => {
        setStep(prev => prev < 3 ? prev + 1 : prev);
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(prev => prev - 1);
        } else {
            // Logic to go back to the previous screen in your app
            console.log("Go back to home screen");
        }
    };
    
    const renderStep = () => {
      switch (step) {
          case 1:
              return <Step1FoodDetails data={formData} setData={setFormData} onNext={handleNext} />;
          case 2:
              return <Step2DeliveryMode data={formData} setData={setFormData} onNext={handleNext} />;
          case 3:
              return <Step3Confirmation data={formData} />;
          default:
              return <Step1FoodDetails data={formData} setData={setFormData} onNext={handleNext} />;
      }
    }

    return (
      <div className="bg-gray-50 min-h-screen font-sans">
          <div className="max-w-md md:max-w-screen mx-auto bg-gray-100">
              <Header onBack={handleBack} />
              <ProgressBar currentStep={step} />
              <main className='mb-24'>
                  {renderStep()}
              </main>
              <BottomNav />
               <style>{`
                  @keyframes fade-in-up {
                      0% { opacity: 0; transform: translateY(10px); }
                      100% { opacity: 1; transform: translateY(0); }
                  }
                  .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
              `}</style>
          </div>
      </div>
    );
}