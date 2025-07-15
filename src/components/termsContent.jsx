import React from 'react';

// Langkah 1: Data tetap disimpan dalam bentuk array yang terstruktur
const termsData = [
  {
    title: 'I. Rekening',
    content: [
      '1. Rekening adalah catatan pembukuan Bank atas produk simpanan yang dibuka oleh Nasabah perorangan pada Bank baik dalam Rupiah maupun mata uang asing atas dasar permohonan tertulis dari Nasabah atau melalui permohonan nasabah melalui sistem e-Banking milik Bank menurut tata cara dan persyaratan yang tercantum baik dalam Ketentuan Umum dan Persyaratan Pembukaan Rekening ini maupun dalam Ketentuan Umum dan Persyaratan Pembukaan Rekening melalui Elektronik Banking (e-Banking).',
      '2. Dalam hal Rekening dibuka dengan mata uang asing maka Bank tidak bertanggung jawab atas perubahan nilai mata uang asing terhadap Rupiah.',
      '3. Jenis-jenis Rekening adalah: Tabungan, Giro, Deposito. Pembukaan rekening melalui e-Form hanya untuk rekening Tabungan.',
      '4. Pengertian Rekening sebagaimana dimaksud pada butir I.1 mencakup Rekening Gabungan yaitu Rekening yang dimiliki oleh lebih dari satu Nasabah yang dapat terdiri dari gabungan orang pribadi. Perjanjian pembukaan Rekening Gabungan dituangkan dalam Perjanjian tersendiri dan wajib pula ditandatangani oleh seluruh Nasabah anggota Rekening Gabungan.',
      '5. Bilamana Nasabah membuka lebih dari satu Rekening pada Bank, baik pada satu Kantor Cabang Bank maupun lebih, maka seluruh Rekening tersebut disetujui oleh Nasabah sebagai satu kesatuan.',
      '6. Bank atas pertimbangannya sendiri berhak menolak permohonan pembukaan Rekening oleh Nasabah dan memberitahukan kepada calon nasabah.',
    ],
  },
  {
    title: 'II. Data Nasabah/Customer Information File(CIF)',
    content: [
      '1. Dalam rangka penggunaan produk/fasilitas/jasa Bank, Nasabah wajib menunjukkan dan menyampaikan informasi, data dan dokumen pendukung yang dipersyaratkan Bank sebagaimana yang disampaikan oleh Petugas Bank dan dimuat dalam media resmi Bank.',
      '2. Bank berhak meminta informasi, data dan dokumen pendukung serta menatakerjakan data profil Nasabah sesuai dengan kebutuhan dan peraturan perundang-undangan yang berlaku.',
      '3. Nasabah dengan ini menjamin bahwa semua data, informasi dan dokumen pendukung yang ditunjukkan dan diserahkan kepada Bank adalah benar, lengkap, asli, sah dan terbaru sesuai dengan peraturan perundang-undangan yang berlaku.',
      '4. Nasabah wajib segera memberitahukan dan menyampaikan kepada Bank setiap perubahan data, informasi dan dokumen pendukung yang dipersyaratkan Bank. Perubahan tersebut efektif berlaku setelah diterima dan/atau disetujui Bank.',
      '5. Nasabah dengan ini menyatakan bertanggung jawab sepenuhnya atas segala kerugian dan risiko yang dialami sebagai akibat dari kelalaian/ keterlambatan/tidak diberitahukannya perubahan sebagaimana diatur dalam butir II.4 tersebut kepada Bank.'
    ],
  },
  {
    title: 'III. Transaksi',
    content: [
        '1. Transaksi adalah kegiatan pembukuan pada suatu Rekening termasuk penambahan saldo dan pengurangan saldo pada Rekening yang pengaturannya mengacu pada media resmi Bank.',
        '2. Dana yang disetorkan/dipergunakan/ditransaksikan pada Bank tidak berasal dari/untuk tujuan tindak pidana pencucian uang (moneylaundering).',
        '3. Setiap Transaksi yang menggunakan suratberharga/ warkat kliring dan sarana perbankan lainnya berlaku pula ketentuan perundangundangan yang mengatur tentang hal tersebut.',
        '4. Nasabah bertanggung jawab sepenuhnya atas keamanan perintah Transaksi/surat berharga yang diberikan kepada Bank, termasuk penyalahgunaan dalam bentuk apapun, pemalsuan, dan penggandaan yang menyebabkan tindak kejahatan.',
        '5. Apabila Rekening dibuka dalam mata uang asing maka penarikan dana dalam mata uang asing yang sama tergantung pada ketersediaan mata uang asing tersebut pada Bank dan tunduk pada ketentuan Bank mengenai komisi sebagaimana yang tertuang dalam media resmiBank.',
        '6. Penarikan dana di rekening dalam mata uang yang berbeda tergantung pada ketersediaan mata uang asing tersebut pada Bank dan tunduk pada ketentuan Bank mengenai komisi dan nilai tukar mata uang tersebut sebagaimana yang tertuang dalam media resmi Bank.',
        '7. Setoran dalam mata uang kertas atau mata uang asing yang sama akan diberlakukan dengan cara sesuai dengan peraturan dan ketentuan yang tertuang dalam media resmi Bank.Berdasarkan itikad baik, Bank berhak melakukan koreksi terhadap pembukuan Rekening Nasabah.',
        '8. Dalam rangka memenuhi peraturan perundang-undangan yang berlaku maupun atas pertimbangan Bank sendiri, Bank berhak menunda, menolak dan/atau membatalkan Transaksi dan memberitahukan kepada Nasabah/Calon Nasabah.',
        '9. Pelaksanaan transaksi valuta asing terhadap Rupiah yang dilakukan oleh Nasabah wajib mengikuti ketentuan dan peraturan perundangundangan yang berlaku, termasuk kewajiban untuk menyerahkan dokumen-dokumen yang dipersyaratkan oleh kebijakan Bank dan/atau peraturan Bank Indonesia dan/atau Peraturan pemerintah yang berlaku dan dipedomani oleh Bank.',
        '10. Apabila terdapat perbedaan antara catatan pembukuan Bank dengan catatan yang ada pada Nasabah, maka yang berlaku adalah catatan pembukuan Bank, dan dengan ini nasabah menyatakan, mengetahui, memahami, mengakui dan menerima bahwa catatan pembukuan Bank merupakan alat bukti yang sah dan mengikat Nasabah.'
    ]
  },
  // ... Lanjutkan untuk semua bagian lainnya (IV, V, dst.)
];

// Langkah 2: Buat komponen internal untuk me-render data
const TermsContentComponent = () => (
  <div>
    <p>
      Dengan ini, saya/kami sebagai pemohon, selanjutnya disebut "Nasabah", menyatakan setuju atas semua Ketentuan Umum dan Persyaratan Pembukaan Rekening yang berlaku di PT. Bank Negara Indonesia (Persero) Tbk, yang selanjutnya disebut "Bank", sebagai berikut :
    </p>
    {termsData.map((section, index) => (
      <div key={index} style={{ marginBottom: '24px' }}>
        <h3>{section.title}</h3>
        {section.content.map((paragraph, pIndex) => (
          <p key={pIndex}>{paragraph}</p>
        ))}
      </div>
    ))}
  </div>
);


// Langkah 3: Buat kembali objek 'termsText' dan ekspor sebagai default
const termsText = {
  content: <TermsContentComponent />
};

export default termsText;