import { LucideZap } from "lucide-react";
import Container from "./Container";

const RateLimitedAlert = () => {
  return (
    <Container>
      <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md">
        <div className="flex flex-col items-center p-6 md:flex-row">
          <div className="bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <LucideZap className="size-10 text-primary" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Rate limit reached</h3>
            <p className="text-base-content mb-1">
              You've made to many request in a short period. Please wait a
              moment.
            </p>
            <p className="text-sm text-base-content/70">
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RateLimitedAlert;
