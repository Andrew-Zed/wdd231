// Data module for fetching artist and event data
// ES Module with async/await and try-catch blocks

// Fetch artists data
export async function fetchArtists() {
    try {
        const response = await fetch('data/artists.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching artists data:', error);
        return getFallbackArtists();
    }
}

// Fallback artists data if JSON fetch fails
function getFallbackArtists() {
    return [
        {
            id: 1,
            name: "Yinka Shonibare",
            category: "visual-arts",
            specialty: "Sculpture & Installation",
            location: "Lagos, Nigeria",
            bio: "Contemporary artist known for exploring cultural identity, colonialism, and post-colonialism through sculpture, painting, photography, and film.",
            yearsActive: "1980-Present",
            notable: "Turner Prize nominee",
            "image": "../images/Yinka-Shonibare.webp"
        },
        {
            id: 2,
            name: "Burna Boy",
            category: "music",
            specialty: "Afrofusion",
            location: "Port Harcourt, Nigeria",
            bio: "Grammy-winning artist blending African music with global influences, creating the Afrofusion genre.",
            yearsActive: "2010-Present",
            notable: "Grammy Award Winner 2021",
            "image": "../images/burna-boy.webp"
        },
        {
            id: 3,
            name: "Chimamanda Ngozi Adichie",
            category: "literature",
            specialty: "Novelist & Essayist",
            location: "Enugu, Nigeria",
            bio: "Internationally acclaimed author known for powerful narratives exploring identity, feminism, and Nigerian culture.",
            yearsActive: "2003-Present",
            notable: "MacArthur Fellowship 2008",
            "image": "../images/Chimamanda-Ngozi-Adichie.webp"
        },
        {
            id: 4,
            name: "Genevieve Nnaji",
            category: "film",
            specialty: "Actress & Director",
            location: "Lagos, Nigeria",
            bio: "Award-winning actress and filmmaker, pioneer in Nollywood's international recognition.",
            yearsActive: "1998-Present",
            notable: "First Netflix Original African Film",
            "image": "../images/Genevieve-Nnaji.webp"
        },
        {
            id: 5,
            name: "Ben Enwonwu",
            category: "visual-arts",
            specialty: "Painter & Sculptor",
            location: "Onitsha, Nigeria",
            bio: "Pioneer of modern African art, known for merging European modernism with African aesthetics.",
            yearsActive: "1944-1994",
            notable: "Tutu Portrait Discovery 2018",
            "image": "../images/Ben-Enwonwu.webp"
        },
        {
            id: 6,
            name: "Wizkid",
            category: "music",
            specialty: "Afrobeats",
            location: "Lagos, Nigeria",
            bio: "Global Afrobeats superstar, collaborating with international artists and bringing Nigerian music to worldwide audiences.",
            yearsActive: "2009-Present",
            notable: "Grammy Award Winner 2021",
            "image": "../images/wizkid.webp"
        },
        {
            id: 7,
            name: "Wole Soyinka",
            category: "literature",
            specialty: "Playwright & Poet",
            location: "Abeokuta, Nigeria",
            bio: "Nobel Prize laureate in literature, first African to receive the honor, known for plays incorporating Yoruba traditions.",
            yearsActive: "1957-Present",
            notable: "Nobel Prize 1986",
            "image": "../images/Wole-Soyinka.webp"
        },
        {
            id: 8,
            name: "Kemi Adetiba",
            category: "film",
            specialty: "Director & Producer",
            location: "Lagos, Nigeria",
            bio: "Director of blockbuster films transforming Nollywood with high production values and compelling storytelling.",
            yearsActive: "2008-Present",
            notable: "King of Boys Franchise",
            "image": "../images/Kemi-Adetiba.webp"
        },
        {
            id: 9,
            name: "Njideka Akunyili Crosby",
            category: "visual-arts",
            specialty: "Painter",
            location: "Enugu, Nigeria",
            bio: "Contemporary painter creating large-scale works exploring Nigerian diaspora experience through mixed media.",
            yearsActive: "2004-Present",
            notable: "MacArthur Fellowship 2017",
            "image": "../images/Njideka-Akunyili-Crosby.webp"
        },
        {
            id: 10,
            name: "Tiwa Savage",
            category: "music",
            specialty: "Afropop",
            location: "Lagos, Nigeria",
            bio: "Queen of Afrobeats, pioneering female artist in African music with international collaborations.",
            yearsActive: "2006-Present",
            notable: "MTV Africa Music Awards",
            "image": "../images/Tiwa-Savage.webp"
        },
        {
            id: 11,
            name: "Chinua Achebe",
            category: "literature",
            specialty: "Novelist",
            location: "Ogidi, Nigeria",
            bio: "Author of Things Fall Apart, one of the most widely read African novels, exploring colonialism's impact.",
            yearsActive: "1958-2013",
            notable: "Man Booker International Prize",
            "image": "../images/Chinua-Achebe.webp"
        },
        {
            id: 12,
            name: "Kunle Afolayan",
            category: "film",
            specialty: "Director & Producer",
            location: "Lagos, Nigeria",
            bio: "Award-winning filmmaker known for critically acclaimed films showcasing Nigerian culture and history.",
            yearsActive: "2005-Present",
            notable: "Multiple AMVCA Awards",
            "image": "../images/Kunle-Afolayan.webp"
        },
        {
            id: 13,
            name: "Peju Alatise",
            category: "visual-arts",
            specialty: "Mixed Media Artist",
            location: "Lagos, Nigeria",
            bio: "Multidisciplinary artist working across painting, sculpture, and installation, exploring gender and cultural themes.",
            yearsActive: "2000-Present",
            notable: "Venice Biennale 2017",
            "image": "../images/Peju-Alatise.webp"
        },
        {
            id: 14,
            name: "Davido",
            category: "music",
            specialty: "Afrobeats",
            location: "Lagos, Nigeria",
            bio: "International Afrobeats star known for hit songs and collaborations with global artists.",
            yearsActive: "2011-Present",
            notable: "BET Awards Winner",
            "image": "../images/Davido.webp"
        },
        {
            id: 15,
            name: "Buchi Emecheta",
            category: "literature",
            specialty: "Novelist",
            location: "Lagos, Nigeria",
            bio: "Pioneering female African writer addressing gender roles, feminism, and social issues in Nigerian society.",
            yearsActive: "1972-2017",
            notable: "Order of the British Empire",
            "image": "../images/Buchi-Emecheta.webp"
        },
        {
            id: 16,
            name: "Ramsey Nouah",
            category: "film",
            specialty: "Actor & Director",
            location: "Lagos, Nigeria",
            bio: "Nollywood icon with decades of memorable performances and recent transition to directing.",
            yearsActive: "1993-Present",
            notable: "Living in Bondage: Breaking Free",
            "image": "../images/Ramsey-Nouah.webp"
        }
    ];
}

// Generate events data dynamically
export function generateEvents() {
    const eventTypes = ['Exhibition', 'Festival', 'Performance', 'Workshop', 'Film Screening'];
    const locations = ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Enugu'];

    const events = [];
    const baseDate = new Date(2025, 9, 16); // October 16, 2025

    for (let i = 0; i < 20; i++) {
        const daysToAdd = Math.floor(Math.random() * 90);
        const eventDate = new Date(baseDate);
        eventDate.setDate(eventDate.getDate() + daysToAdd);

        const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];

        events.push({
            id: i + 1,
            title: `${type} ${i + 1}: Nigerian Arts Showcase`,
            type: type.toLowerCase().replace(' ', '-'),
            date: eventDate.toISOString().split('T')[0],
            time: '18:00',
            location: location,
            venue: `${location} Arts Center`,
            description: `Join us for an exciting ${type.toLowerCase()} celebrating Nigerian arts and culture. This event features talented artists and performers from across Nigeria.`,
            price: i % 3 === 0 ? 'Free' : `₦${(Math.floor(Math.random() * 5) + 1) * 1000}`
        });
    }

    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
}

export default { fetchArtists, generateEvents };