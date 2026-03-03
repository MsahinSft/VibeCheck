import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const CONTENT_DATA = [
    {
        id: '1',
        title: 'Bağımlılık',
        icon: 'brain',
        description: 'Bağımlılık her zaman tek başına üstesinden gelinebilecek bir durum değildir.',
        tips: [
            'Tetikleyicilerinizi belirleyin ve uzak durun.',
            'Yeni ve sağlıklı hobiler edinin.',
            'Profesyonel veya akran desteği aramaktan çekinmeyin.'
        ],
        actionText: 'Destek Gruplarını Gör',
    },
    {
        id: '2',
        title: 'Anksiyete\nDepresyon',
        icon: 'brain',
        description: 'Bugün nasılsın? Zihnindeki bulutları biraz dağıtmaya ne dersin?',
        tips: [
            'Günlük 10 dakika nefes egzersizi yap.',
            'Aklından geçenleri bir kağıda yaz.',
            'Açık havada kısa bir yürüyüşe çık.'
        ],
        actionText: 'Nefes Egzersizine Başla',
    },
    {
        id: '3',
        title: 'Partner\nŞiddeti',
        icon: 'account-group',
        description: 'Güvenliğin her şeyden önemli. Yalnız olmadığını ve seçeneklerin olduğunu unutma.',
        isEmergency: true,
        tips: [
            'Güvendiğin biriyle konuş.',
            'Acil durum planı oluştur.',
            'Destek hatlarını telefonuna kaydet.'
        ],
        actionText: 'Acil Yardım Hatları',
    },
    {
        id: '4',
        title: 'Genel\nSağlık',
        icon: 'heart-pulse',
        description: 'Sağlıklı bir beden, sağlıklı bir zihnin temelidir.',
        tips: [
            'Bol su tüketmeye özen göster.',
            'Günlük hareket miktarını artır.',
            'Düzenli sağlık kontrollerini aksatma.'
        ],
        actionText: 'Günlük Hedefini Belirle',
    },
    {
        id: '5',
        title: 'Yeme\nBozukluğu',
        icon: 'food-apple',
        description: 'Bedeninin ihtiyaçlarını dinle. Beslenme fiziksel ve ruhsal sağlığın bir bütünüdür.',
        tips: [
            'Öğün atlamamaya çalış.',
            'Yiyecekleri kategorize etmekten kaçın.',
            'Beden olumlama hesaplarını takip et.'
        ],
        actionText: 'Beslenme Danışmanlığı',
    },
    {
        id: '6',
        title: 'Diğer',
        icon: 'gender-male-female',
        description: 'Farklı konularda desteğe ihtiyaç duyuyorsan her zaman yanındayız.',
        tips: [
            'Duygularınızı maskelemeyin.',
            'Kendi sınırlarınızı çizin.',
            'İhtiyaç hissettiğinizde destek talep edin.'
        ],
        actionText: 'Tüm Konuları İncele',
    },
    {
        id: '7',
        title: 'Uyku\nBozukluğu',
        icon: 'weather-night',
        description: 'İyi bir uyku zihinsel toparlanmanın en önemli parçasıdır.',
        tips: [
            'Yatmadan 1 saat önce ekranları kapat.',
            'Odanın karanlık ve serin olmasını sağla.',
            'Her gün aynı saatte uyanmaya çalış.'
        ],
        actionText: 'Uyku Günlüğünü Aç',
    }
];

export const AppProvider = ({ children }) => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    // Sahte veriyi çekme işlemi
    const fetchTopics = () => {
        setLoading(true);
        setTimeout(() => {
            setTopics(CONTENT_DATA);
            setLoading(false);
        }, 2000); // 2 saniye loading süresi (Hoca kriteri)
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    // Empty state simülasyonu için
    const clearTopics = () => setTopics([]);
    const restoreTopics = () => fetchTopics();

    return (
        <AppContext.Provider value={{ topics, loading, clearTopics, restoreTopics }}>
            {children}
        </AppContext.Provider>
    );
};
