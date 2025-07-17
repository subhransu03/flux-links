import { Link2, Sparkles } from 'lucide-react';

export const Icons = {
  logo: (props: React.ComponentProps<'svg'>) => (
    <div className="relative flex items-center justify-center">
        <Link2 className="size-6 text-primary" {...props} />
        <Sparkles className="absolute -top-1 -right-1.5 size-3.5 text-accent" {...props} />
    </div>
  ),
};
