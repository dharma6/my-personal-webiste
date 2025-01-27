import { assets } from '@/assets/assets';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

const Contact = () => {
  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult('Sending....');

    try {
      const formData = new FormData(event.target);
      formData.append(
        'access_key',
        process.env.NEXT_PUBLIC_CONTACT_FORM_API_KEY
      );

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult('Form Submitted Successfully');
        event.target.reset();
      } else {
        console.error('Submission Error:', data);
        setResult(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setResult('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Dharma Bandaru</title>
        <meta
          name="description"
          content="Get in touch with Dharma Bandaru. Send a message through this contact form."
        />
      </Head>

      <section
        id="contact"
        className='w-full px-[12%] py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")]
          bg-no-repeat bg-center bg-[length:90%_auto] dark:bg-none'
        aria-label="Contact section"
      >
        <h2 className="text-center mb-2 text-lg font-Ovo">Connect</h2>
        <h2 className="text-center text-5xl font-Ovo">Stay in touch</h2>
        <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
          Ideally this form is not needed :) but just left it as it came with
          template. It's working though.
        </p>

        <form
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto"
          aria-label="Contact form"
          noValidate
        >
          <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
            <div className="flex flex-col">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                required
                className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white
                  dark:bg-darkHover/30 dark:border-white/90 focus:ring-2 focus:ring-gray-400"
                name="name"
                aria-required="true"
                minLength={2}
                autoComplete="name"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white
                  dark:bg-darkHover/30 dark:border-white/90 focus:ring-2 focus:ring-gray-400"
                name="email"
                aria-required="true"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              rows="6"
              placeholder="Enter your message"
              required
              className="w-full flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white
                dark:bg-darkHover/30 dark:border-white/90 focus:ring-2 focus:ring-gray-400"
              name="message"
              aria-required="true"
              minLength={10}
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-6 py-3 px-8 w-max flex items-center justify-between gap-2
              bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500
              dark:bg-transparent dark:border-[0.5px] dark:hover:bg-darkHover focus:ring-2
              focus:ring-offset-2 focus:ring-gray-400"
            disabled={isSubmitting}
            aria-label="Submit contact form"
          >
            {isSubmitting ? 'Submitting...' : 'Submit now'}
            <Image
              src={assets.right_arrow_white}
              alt=""
              className="w-4"
              width={16}
              height={16}
              aria-hidden="true"
            />
          </button>

          {result && (
            <p
              className={`mt-4 text-center ${
                result.includes('Successfully')
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
              role="status"
              aria-live="polite"
            >
              {result}
            </p>
          )}
        </form>
      </section>
    </>
  );
};

export default Contact;
