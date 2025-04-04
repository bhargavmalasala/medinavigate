const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json()); 
app.use(express.static('public')); 
app.use(cors());


const medicalFacilities = [
  {
      "name": "Apollo Hospitals (Ram Nagar)",
      "lat": "17.7256 N",
      "lon": "83.3077 E",
      "type": "hospital",
      "specialties": ["Cardiology", "ENT", "Endocrinology", "Neurology", "Oncology"],
      "doctors": ["Dr. Dibya Kumar Baruah (Cardiology)", "Dr. Pradeep Palakonda (ENT)"]
  },
  {
      "name": "Apollo Hospitals (Health City, Arilova)",
      "lat": "17.7328 N",
      "lon": "83.3375 E",
      "type": "hospital",
      "specialties": ["Oncology", "Neurology", "Urology"],
      "doctors": ["Dr. Rajesh Venkat Indala (Neurology)", "Dr. Praveen Adsumilli (Oncology)"]
  },
  {
      "name": "Care Hospitals (Ram Nagar)",
      "lat": "17.7250 N",
      "lon": "83.3070 E",
      "type": "hospital",
      "specialties": ["Cardiology", "Gastroenterology", "Nephrology"],
      "doctors": ["Dr. A.V. Siva Prasad (Gastroenterology)", "Dr. G.S.R. Murthy (Cardiology)"]
  },
  {
      "name": "Medicover Hospitals (MVP Colony)",
      "lat": "17.7350 N",
      "lon": "83.3250 E",
      "type": "hospital",
      "specialties": ["Cardiology", "Neurology", "Orthopedics"],
      "doctors": ["Dr. S.Srikar Samir Nandan (Cardiology)", "Dr. K. Satya Rao (Neurology)"]
  },
  {
      "name": "KIMS ICON Hospital",
      "lat": "17.7100 N",
      "lon": "83.2050 E",
      "type": "hospital",
      "specialties": ["Cardiology", "Gastroenterology", "Neurology"],
      "doctors": ["Dr. Chalapathi Rao (Cardiology)", "Dr. Srinivas Nistala (Gastroenterology)"]
  },
  {
      "name": "Omega Cancer Hospitals",
      "lat": "17.7320 N",
      "lon": "83.3350 E",
      "type": "hospital",
      "specialties": ["Oncology"],
      "doctors": ["Dr. B. Ravi Shankar (Oncology)"]
  },
  {
      "name": "Pinnacle Hospitals (Health City, Arilova)",
      "lat": "17.7327 N",
      "lon": "83.3370 E",
      "type": "hospital",
      "specialties": ["Nephrology", "Neurology", "Urology"],
      "doctors": ["Dr. K. Kalyan Chakravarthy (Nephrology)"]
  },
  {
      "name": "Seven Hills Hospital",
      "lat": "17.7200 N",
      "lon": "83.3050 E",
      "type": "hospital",
      "specialties": ["ENT", "Cardiology"],
      "doctors": ["Dr. Surendra Y Lele (ENT)"]
  },
  {
      "name": "King George Hospital (KGH)",
      "lat": "17.7042 N",
      "lon": "83.3005 E",
      "type": "hospital",
      "specialties": ["General Medicine", "Surgery", "Emergency Care", "Pediatrics"],
      "doctors": ["Dr. V. Rama Narasimham (General Medicine)", "Dr. K. Santhosh Kumar (Surgery)"]
  },

  {
      "name": "Asian ENT Hospital",
      "lat": "17.7270 N",
      "lon": "83.3000 E",
      "type": "clinic",
      "specialties": ["ENT"],
      "doctors": ["Dr. Pradeep Vundavalli (ENT)"]
  },
  {
      "name": "Susruta ENT Clinic",
      "lat": "17.7275 N",
      "lon": "83.2990 E",
      "type": "clinic",
      "specialties": ["ENT"],
      "doctors": ["Dr. K. Suneel (ENT)"]
  },
  {
      "name": "Visakha ENT Hospital",
      "lat": "17.7260 N",
      "lon": "83.3040 E",
      "type": "clinic",
      "specialties": ["ENT"],
      "doctors": ["Dr. L.V. Syamala Rao (ENT)"]
  },
  {
      "name": "Vizagh ENT Clinic",
      "lat": "17.6860 N",
      "lon": "83.2050 E",
      "type": "clinic",
      "specialties": ["ENT"],
      "doctors": []
  },
  {
      "name": "Chaitanya Liver and Gastro Centre",
      "lat": "17.7160 N",
      "lon": "83.3050 E",
      "type": "clinic",
      "specialties": ["Gastroenterology"],
      "doctors": ["Dr. Chaitanya Koppolu (Gastroenterology)"]
  },
  {
      "name": "Institute of Gastroenterology",
      "lat": "17.7250 N",
      "lon": "83.3070 E",
      "type": "clinic",
      "specialties": ["Gastroenterology"],
      "doctors": ["Dr. A.V. Siva Prasad (Gastroenterology)"]
  },
  {
      "name": "Manikya Institute of Gastroenterology",
      "lat": "17.7100 N",
      "lon": "83.3000 E",
      "type": "clinic",
      "specialties": ["Gastroenterology"],
      "doctors": ["Dr. Biswabasu Das (Gastroenterology)"]
  },
  {
      "name": "Asian Institute of Nephrology & Urology (AINU)",
      "lat": "17.7270 N",
      "lon": "83.2980 E",
      "type": "clinic",
      "specialties": ["Nephrology", "Urology"],
      "doctors": ["Dr. G. Ravindra Varma (Urology)", "Dr. Vani Degala (Nephrology)"]
  },
  {
      "name": "Kidney Health Clinic",
      "lat": "17.7165 N",
      "lon": "83.3060 E",
      "type": "clinic",
      "specialties": ["Nephrology"],
      "doctors": ["Dr. D. Prabhakar (Nephrology)"]
  },
  {
      "name": "Waltair Kidney Centre",
      "lat": "17.7255 N",
      "lon": "83.3080 E",
      "type": "clinic",
      "specialties": ["Nephrology"],
      "doctors": []
  },
  {
      "name": "Aditya Neuro Care",
      "lat": "17.7105 N",
      "lon": "83.3010 E",
      "type": "clinic",
      "specialties": ["Neurology"],
      "doctors": ["Dr. M.G.V. Aditya (Neurology)"]
  },
  {
      "name": "Excel Brain and Spine Care",
      "lat": "17.7180 N",
      "lon": "83.3030 E",
      "type": "clinic",
      "specialties": ["Neurosurgery"],
      "doctors": []
  },
  {
      "name": "Anu Institute of Neuro Sciences",
      "lat": "17.7160 N",
      "lon": "83.3055 E",
      "type": "clinic",
      "specialties": ["Neurology"],
      "doctors": []
  },
  {
      "name": "Mahatma Gandhi Cancer Hospital",
      "lat": "17.7355 N",
      "lon": "83.3240 E",
      "type": "hospital",
      "specialties": ["Oncology"],
      "doctors": ["Dr. M.P.S. Chandra Kalyan (Oncology)"]
  },
  {
      "name": "Apollo Cancer Centre",
      "lat": "17.7328 N",
      "lon": "83.3375 E",
      "type": "hospital",
      "specialties": ["Oncology"],
      "doctors": ["Dr. Praveen Adsumilli (Oncology)"]
  },
  {
      "name": "Visakha Institute of Skin & Allergy",
      "lat": "17.7140 N",
      "lon": "83.3040 E",
      "type": "clinic",
      "specialties": ["Dermatology"],
      "doctors": ["Dr. Sasi Kiran Attili (Dermatology)"]
  },
  {
      "name": "GHT Clinic",
      "lat": "17.7270 N",
      "lon": "83.2995 E",
      "type": "clinic",
      "specialties": ["Dermatology", "Hair Transplant"],
      "doctors": ["Dr. K. Venkatachalam (Dermatology)"]
  },
  {
      "name": "Scala Skin & Hair Transplant Clinic",
      "lat": "17.7265 N",
      "lon": "83.3005 E",
      "type": "clinic",
      "specialties": ["Dermatology", "Hair Transplant"],
      "doctors": ["Dr. Srinivas Rao M (Dermatology)"]
  },
  {
      "name": "Visakha Diabetes & Endocrine Centre",
      "lat": "17.7100 N",
      "lon": "83.3005 E",
      "type": "clinic",
      "specialties": ["Endocrinology"],
      "doctors": ["Dr. K. Dileep Kumar (Endocrinology)"]
  },
  {
      "name": "Apollo Sugar Clinics",
      "lat": "17.7256 N",
      "lon": "83.3077 E",
      "type": "clinic",
      "specialties": ["Endocrinology"],
      "doctors": ["Dr. G. Sri Harsha (Endocrinology)"]
  },
  {
      "name": "Abhaya Psychiatric Care Centre",
      "lat": "17.7165 N",
      "lon": "83.3055 E",
      "type": "clinic",
      "specialties": ["Psychiatry"],
      "doctors": ["Dr. G.V.S. Murthy (Psychiatry)"]
  },
  {
      "name": "Sanjeevini Mind Care",
      "lat": "17.7380 N",
      "lon": "83.3100 E",
      "type": "clinic",
      "specialties": ["Psychiatry"],
      "doctors": ["Dr. Rekha Dutt Kancharla (Psychiatry)"]
  },
  {
      "name": "Chest Clinic",
      "lat": "17.7160 N",
      "lon": "83.3065 E",
      "type": "clinic",
      "specialties": ["Pulmonology"],
      "doctors": ["Dr. Bala Raju Tadikonda (Pulmonology)"]
  },
  {
      "name": "Dr. Phanender Chest Care",
      "lat": "17.7350 N",
      "lon": "83.3245 E",
      "type": "clinic",
      "specialties": ["Pulmonology"],
      "doctors": ["Dr. Phanender Ketha (Pulmonology)"]
  },
  {
      "name": "Dr. Adims Center for Rheumatology",
      "lat": "17.7300 N",
      "lon": "83.2950 E",
      "type": "clinic",
      "specialties": ["Rheumatology"],
      "doctors": ["Dr. Suresh Adimulam (Rheumatology)"]
  },
  {
      "name": "Vizag Rheumatology & Immunology Centre",
      "lat": "17.7355 N",
      "lon": "83.3250 E",
      "type": "clinic",
      "specialties": ["Rheumatology"],
      "doctors": ["Dr. Vishnu Vardhan Reddy (Rheumatology)"]
  },
  {
      "name": "Maxi Vision Eye Hospital",
      "lat": "17.7275 N",
      "lon": "83.2985 E",
      "type": "clinic",
      "specialties": ["Ophthalmology"],
      "doctors": ["Dr. Vengala Rao (Ophthalmology)"]
  },
  {
      "name": "LV Prasad Eye Institute",
      "lat": "17.7320 N",
      "lon": "83.3385 E",
      "type": "hospital",
      "specialties": ["Ophthalmology"],
      "doctors": ["Dr. Ishaq Mohammad (Ophthalmology)"]
  }
];

app.post('/search-hospitals', (req, res) => {
    console.log('Request received:', req.body);
    const { query, latitude, longitude } = req.body;

    const symptomToSpecialty = {
        "chest pain": "Cardiology",
        "heart attack": "Cardiology",
        "cancer": "Oncology",
        "tumor": "Oncology",
        "fever": "General Medicine",
        "cold": "General Medicine",
        "kidney pain": "Nephrology",
        "urine problem": "Nephrology",
        "headache": "Neurology",
        "seizure": "Neurology",
        "stomach pain": "Gastroenterology",
        "diarrhea": "Gastroenterology",
        "ear pain": "ENT",
        "throat infection": "ENT",
        "eye problem": "Ophthalmology",
        "vision loss": "Ophthalmology",
        "skin rash": "Dermatology",
        "hair loss": "Dermatology",
        "joint pain": "Rheumatology",
        "arthritis": "Rheumatology",
        "breathing difficulty": "Pulmonology",
        "cough": "Pulmonology",
        "depression": "Psychiatry",
        "anxiety": "Psychiatry",
        "diabetes": "Endocrinology",
        "thyroid": "Endocrinology",
        "general": "General Medicine"
    };

    const searchQuery = query.trim().toLowerCase();
    const specialty = symptomToSpecialty[searchQuery] || "General Medicine";

    // Filter hospitals by specialty 
    const filteredHospitals = medicalFacilities
        .map(hospital => {
            const lat = parseFloat(hospital.lat.split(" ")[0]);
            const lon = parseFloat(hospital.lon.split(" ")[0]);
            const distance = calculateDistance(latitude, longitude, lat, lon);
            return { ...hospital, distance, lat, lon }; 
        })
        .filter(hospital => hospital.specialties.includes(specialty))
        .sort((a, b) => a.distance - b.distance);

    console.log('Sending response:', filteredHospitals.slice(0, 3));
    res.json(filteredHospitals.slice(0, 3)); 
});

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

app.listen(PORT, () => {
    console.log(
        `Server running on http://localhost:${PORT}`);
});