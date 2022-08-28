const fetch = (...args) =>
import('node-fetch').then(({ default: fetch }) => fetch(...args));

const uri = `https://kasirpintar.co.id/allAddress.txt`;

const getDataId = async (req, res) => {
    try {

      const response = await fetch(uri, {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json());

    let input  = req.body;
    let data = {}
    let provinsi = response?.address_provinsi.filter(function (e) {
      return e.id === input.id
    })

    let kota = response?.address_kota.filter(function (e) {
      return e.id === input.id
    })

    let kecamatan = response?.address_kecamatan.filter(function (e) {
      return e.id === input.id
    })

    let kelurahan = response?.address_kelurahan.filter(function (e) {
      return e.id === input.id
    })
    
    if(provinsi.length > 0){
      data = {
        status: 'Success',
        address_provinsi: provinsi
      }
    } else if (kota.length > 0) {
      data = {
        status: 'Success',
        address_kota: kota
      }
    } else if (kecamatan.length > 0) {
      data = {
        status: 'Success',
        address_kecamatan: kecamatan
      }
    } else if( kelurahan.length > 0) {
      data = {
        status: 'Success',
        address_kelurahan: kelurahan
      }
    } else {
      data = {
        status: 'Failed',
        message: 'Data Tidak Ditemukan'
      }
    }
    
      return res.json(data);
    } catch (err) {
      res.json({
        status: 'Error',
        message: err.message
      });
    }
  }

  const getDataCity = async (req, res) => {
    try {
      
      const response = await fetch(uri, {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json());

    let input  = req.body;
    let data = {}

    let kecamatan = response?.address_kecamatan.filter(function (e) {
      return e.kota_id === input.id
    })

    
    if (kecamatan.length > 0) {
      data = {
        status: 'Success',
        address_kecamatan: kecamatan
      }
    } else {
      data = {
        status: 'Failed',
        message: 'Data Tidak Ditemukan'
      }
    }
    
      return res.json(data);
    } catch (err) {
      res.json({
        status: 'Error',
        message: err.message
      });
    }
  }

  module.exports = {
    getDataId,
    getDataCity
  }