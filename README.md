# Gradian CRM 🧬💊

**Medical Device & Drug Delivery CRM | Modern, Minimal, Micro-Animated**

Gradian CRM is a web application designed to streamline **healthcare professional (HCP) management, sales, contracts, and regulatory compliance** for medical device and pharmaceutical sales teams. Built with **React, shadcn/ui, Tailwind CSS, and Framer Motion**, it offers a **modular, component-driven architecture** and intuitive dashboards for field reps and managers.

---

## 🚀 Features (MVP)

### Core CRM

* HCP, hospital, clinic, and distributor profiles
* Tag-based categorization by specialty, product interest, and region
* Appointment & visitor management with **GPS check-in/out**
* Medical sample tracking with batch/expiry monitoring

### Sales & Funnel

* Lead management & pipeline visualization
* Tender & bid tracking with multi-stage approvals
* Sales funnel analytics and conversion metrics

### Contracts & Compliance

* Digital contract storage with templates & e-signatures
* Regulatory documentation linked to products & HCPs
* Expiry alerts and compliance monitoring

### Analytics & Dashboards

* Territory coverage & HCP engagement metrics
* Sales vs compliance insights
* Contract and tender risk dashboard

### UI/UX Highlights

* **Modern, minimal, responsive design**
* Micro-animations for funnel stages, visits, and map pins
* Interactive dashboards with Framer Motion transitions
* Fully modular **component-driven architecture**

---

## 🏗️ Architecture

* **Atoms**: Button, Input, Badge, Avatar, Tooltip, Tag, Stepper
* **Molecules**: DoctorCard, HospitalCard, ContractCard, SampleCard, TenderItem, MapMarker
* **Organisms**: HCPProfile, SalesFunnelBoard, GPSMap, ContractList, TenderBoard
* **Templates/Pages**: Dashboard, Customer Page, Tender Page, Contract Page, Field Rep Page

---

## ⚡ Tech Stack

* **Frontend**: React, shadcn/ui, Tailwind CSS, Framer Motion
* **State Management**: React Query / Zustand (optional)
* **Maps & GPS**: Google Maps API / Leaflet
* **Backend**: Node.js + Express (suggested) or any REST/GraphQL API
* **Database**: PostgreSQL / Graph DB (optional for complex relations)

---

## 📦 Installation

```bash
# Clone repo
git clone https://github.com/yourusername/gradian-crm.git
cd gradian-crm

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🛠️ Usage

* Navigate to `/dashboard` for KPIs and analytics
* Manage HCPs and appointments via `/customers`
* Track sales funnel and tenders via `/sales-funnel`
* Manage contracts and regulatory documents via `/contracts`
* Field reps can view map, check-in visits, and track sample distribution

---

## 🔒 Compliance Notes

Gradian CRM is designed for **regulated industries**:

* Supports batch tracking, tender approvals, and digital contract workflows
* Tracks interactions to meet local regulatory requirements

---

## 🌐 Contribution

Contributions are welcome! Please fork the repo, create a branch for your feature, and submit a pull request.

---

## 📄 License

This project is **MIT Licensed** – see the [LICENSE](LICENSE) file for details.
