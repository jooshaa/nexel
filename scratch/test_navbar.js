const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:1337';
const CMS_TOKEN = process.env.CMS_API_TOKEN;

async function testNavbar() {
  const path = '/navbar-sections';
  const params = {
    'filters[active][$eq]': 'true',
    'populate': {
      category: { populate: '*' },
      featuredProducts: { populate: { images: true } },
      promoImage: true
    }
  };

  const url = new URL(`${CMS_URL}/api${path}`);
  
  const appendParams = (searchParams, data, prefix = '') => {
    if (data === null || data === undefined) return;
    if (typeof data === 'object' && !Array.isArray(data)) {
      Object.entries(data).forEach(([key, value]) => {
        const fullKey = prefix ? `${prefix}[${key}]` : key;
        appendParams(searchParams, value, fullKey);
      });
    } else if (Array.isArray(data)) {
      data.forEach((value, index) => {
        const fullKey = `${prefix}[${index}]`;
        appendParams(searchParams, value, fullKey);
      });
    } else {
      searchParams.set(prefix, String(data));
    }
  };

  appendParams(url.searchParams, params);

  console.log('Fetching:', url.toString());
  
  try {
    const res = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        ...(CMS_TOKEN ? { Authorization: `Bearer ${CMS_TOKEN}` } : {}),
      }
    });

    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Data:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}

testNavbar();
