import { useNavigate } from "react-router-dom";
import { Settings, BookOpen, Heart, Import, Camera } from "lucide-react";
import raccoonMascot from "@/assets/raccoon-mascot.png";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24 px-4">
      <div className="pt-6 flex items-center justify-between mb-6">
        <h1 className="font-display text-xl font-bold text-foreground">Profile</h1>
        <button className="p-2 text-muted-foreground">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <div className="w-20 h-20 rounded-full gradient-warm flex items-center justify-center">
          <img src={raccoonMascot} alt="Profile" className="w-14 h-14" />
        </div>
        <div className="text-center">
          <h2 className="font-display text-lg font-bold text-foreground">Chef Raccoon</h2>
          <p className="text-sm text-muted-foreground">@pantrychef_user</p>
        </div>
        <div className="flex gap-6 mt-2">
          {[
            { label: "Recipes", value: "12" },
            { label: "Cooked", value: "8" },
            { label: "Friends", value: "24" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-display font-bold text-lg text-foreground">{stat.value}</span>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="space-y-2">
        {[
          { icon: BookOpen, label: "My Recipes", desc: "Your saved collection", path: "/" },
          { icon: Heart, label: "Favorites", desc: "Recipes you've liked", path: "/" },
          { icon: Import, label: "Imported", desc: "Recipes from videos", path: "/import" },
          { icon: Camera, label: "Scanned", desc: "From ingredient photos", path: "/scan" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="w-full bg-card rounded-xl p-4 flex items-center gap-3 border border-border hover:border-primary/30 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-sm font-display font-semibold text-foreground">{item.label}</span>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
