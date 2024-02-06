import React from 'react'

export default function ContactUs() {
  return (
    <div className='conotainer'>
        {/* <!-- Modal Search Start --> */}
        <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content rounded-0">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Search by keyword</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex align-items-center">
                        <div class="input-group w-75 mx-auto d-flex">
                            <input type="search" class="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1"/>
                            <span id="search-icon-1" class="input-group-text p-3"><i class="fa fa-search"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Modal Search End --> */}


        {/* <!-- Contact Us Start --> */}
        <div class="container-fluid py-5">
            <div class="container py-5">
                <div class="bg-light rounded p-5">
                    <div class="row g-4">
                        <div class="col-lg-5">
                            <div class="">
                                <h1 class="mb-4">General Customer Care & Technical Support</h1>
                                <p class="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done.</p>
                                <div class="rounded">
                                    {/* <iframe class="rounded w-100" 
                                    style={{height: "425px;"}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd" 
                                    loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                                    <iframe   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1836.2871259625554!2d72.50186507883556!3d23.002678268829502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9adc00bd0ccd%3A0x83c31517af795c15!2sSynergy%20Tower%2C%20Corporate%20Rd%2C%20Makarba%2C%20Ahmedabad%2C%20Gujarat%20380015%2C%20India!5e0!3m2!1sen!2sbd!4v1707144947209!5m2!1sen!2sbd" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <form action="" class="mb-4">
                                <div class="row g-4">
                                    <div class="col-lg-6">
                                        <input type="text" class="w-100 form-control border-0 py-3" name="name" placeholder="Your Name"/>
                                    </div>
                                    <div class="col-lg-6">
                                        <input type="email" class="w-100 form-control border-0 py-3" name="email" placeholder="Enter Your Email"/>
                                    </div>
                                    <div class="col-lg-6">
                                        <input type="text" class="w-100 form-control border-0 py-3" name="phone" placeholder="Enter Your Phone"/>
                                    </div>
                                    <div class="col-lg-6">
                                        <input type="text" class="w-100 form-control border-0 py-3" name="subject" placeholder="Subject"/>
                                    </div>
                                    <div class="col-12">
                                        <textarea class="w-100 form-control border-0" rows="6" cols="10" placeholder="Your Message"></textarea>
                                    </div>
                                    <div class="col-12">
                                        <button class="w-100 btn btn-primary form-control py-3" type="submit">Submit Now</button>
                                    </div>
                                </div>
                            </form>
                            <div class="row g-4">
                                <div class="col-xl-6">
                                    <div class="d-flex p-4 rounded bg-white">
                                        <i class="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                                        <div>
                                            <h4 style={{marginLeft:'25px'}}>Address</h4>
                                            <p class="mb-0">Synergy Tower, Corporate Rd, Makarba, Ahmedabad, Gujarat 380015, India</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="d-flex p-4 rounded bg-white">
                                        <i class="fas fa-envelope fa-2x text-primary me-4"></i>
                                        <div>
                                            <h4 style={{marginLeft:'25px'}}>Mail Us</h4>
                                            <p class="mb-0">mahmood@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="d-flex p-4 rounded bg-white">
                                        <i class="fa fa-phone-alt fa-2x text-primary me-4"></i>
                                        <div>
                                            <h4 style={{marginLeft:'25px'}}>Telephone</h4>
                                            <p class="mb-0">(+91) 7984973066</p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Contact Us End --> */}
    </div>
  )
}
