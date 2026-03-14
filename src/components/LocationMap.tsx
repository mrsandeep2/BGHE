const mapsLink = "https://maps.app.goo.gl/bbzkLZjsFYQxuikq5";
const mapEmbedUrl = "https://www.google.com/maps?q=Bharat+Group+of+Higher+Education+Forbesganj+Bihar&output=embed";

const LocationMap = () => {
  return (
    <section className="mx-auto mt-10 w-full max-w-[1200px] sm:mt-12" aria-labelledby="visit-our-office-title">
      <div className="text-center">
        <h2 id="visit-our-office-title" className="text-2xl font-heading font-bold text-foreground sm:text-3xl">
          Visit Our Office
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          Find BGHE Education easily and visit our office for admission guidance, counseling, and support.
        </p>
        <a
          href={mapsLink}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90"
        >
          Open in Google Maps
        </a>
      </div>

      <div className="relative mt-6 overflow-hidden rounded-xl border border-border/70 bg-card shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
        <iframe
          src={mapEmbedUrl}
          title="Bharat Group of Higher Education office location"
          className="h-[300px] w-full md:h-[400px]"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a
          href={mapsLink}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Open Bharat Group of Higher Education in Google Maps"
          className="absolute inset-0 z-10 block"
        />
      </div>

      <div className="mt-5 rounded-xl border border-border/60 bg-background/80 px-5 py-4 text-center shadow-sm backdrop-blur-sm sm:px-6">
        <p className="text-base font-semibold text-foreground">Bharat Group of Higher Education</p>
        <p className="mt-1 text-sm text-muted-foreground">Near T.V. Tower, Block Road</p>
        <p className="text-sm text-muted-foreground">Forbesganj, Bihar</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Phone: <a href="tel:7546935196" className="font-medium text-accent transition-colors hover:text-accent/80">7546935196</a>
        </p>
      </div>
    </section>
  );
};

export default LocationMap;