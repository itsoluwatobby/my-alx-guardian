import { useNavigate } from "react-router-dom";
import { useGuardianContext } from "../hooks/useGuardianContext";
import { ChangeEvent, useEffect, useState } from "react";
import { initAppState, initUserDetails } from "../utility/initVaraibles";
import { MAX_LENGTH } from "../utility/constants";
import { guardianAsyncWrapper } from "../app/guardianAsyncWrapper";
import { sanitizeEntries } from "../utility/helpers";
import { deleteImage, imageUpload } from "../utility/image-controller";
import { userAPI } from "../app/api-calls/user.api";
import { toast } from "react-toastify";
import { ActionButton } from "../components/ActionButton";
import { Location, UserSocialAccounts, TextInput, TopInfo } from "../components/editProfile";

const initSocials = { platform: '', handle: '' };
export default function EditProfile() {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null);
  const { currentUser, theme } = useGuardianContext() as GuardianContextType;
  const [user, setUser] = useState<Partial<UpdateUserRequest>>(initUserDetails);

  const [errorImageUrl, setErrorImageUrl] = useState<string | null>(null);
  const [socials, setSocials] = useState<UserSocialAccounts>(initSocials);
  const [appState, setAppState] = useState<AppStateType>(initAppState);

  const {
    firstName, lastName, profilePicture, location, skills,
    cohort, activeAccounts,
  } = user;

  const { isError, loading } = appState;

  useEffect(() => {
    if (!currentUser) return;
    setUser({ ...currentUser, skills: (currentUser.skills as string[]).join(', ') });
  }, [currentUser])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (file === null) return
    if ((file as File).size > MAX_LENGTH.MAX_FILE_SIZE) {
      setAppState(prev => ({ ...prev, isError: true, error: 'File too large' }))
      setFile(null)
      return alert('MAX ALLOWED FILE SIZE IS 800kb')
    }
  }, [file])

  const handleSubmit = () => {
    if (loading) return;
    guardianAsyncWrapper(async () => {
      setAppState(prev => ({ ...prev, loading: true }));
      const {
        _id, firstName, title, bio, lastName,
        activeAccounts, cohort, location,
      } = user;
      const sanitizeLocation = sanitizeEntries(location!);
      const sanitizeStrings = sanitizeEntries(
        { firstName, title, bio, lastName, cohort },
      );
      let res: ImageReturnType = { url: '', status: '' };
      if (!errorImageUrl && file) {
        res = await imageUpload(file as File, 'profile-images');
        setErrorImageUrl(res.url);
      }
      // delete previous image
      if ((profilePicture as string)?.length > 1) {
        await deleteImage(profilePicture!, 'profile-images');
      }
      const userObj: UpdateUserRequest = {
        id: _id as string, ...sanitizeStrings,
        skills: (skills as unknown as string)?.split(', '),
        location: sanitizeLocation,
        profilePicture: errorImageUrl ?? res.url,
        activeAccounts,
      }
      const response = await userAPI.updateUser(userObj);
      setUser(response.data);
      setSocials(initSocials);
      toast.success(`Profile updated✌️`);
    }, setAppState);
  };

  return (
    <main className="page flex flex-col gap-y-5 px-2 py-4 h-full w-full overflow-y-scroll">
      <button
        onClick={() => navigate(-1)}
        className={`p-2 rounded-md -mt-2 ${theme === 'light' ? 'border-[#0f7743] bg-[#757474]' : 'border-[#335544] bg-[#333333]'} text-white border border-[#335544] w-32 text-[13px] hover:opacity-95 transition-opacity`}
      >
        Return to profile
      </button>

      <TopInfo
        user={user as UpdateUserRequest} handleChange={handleChange}
        setFile={setFile} setUser={setUser}
      />

      <div className="border-0 self-start w-full flex flex-col items-cente gap-y-2 flex-wrap text-sm">
        <TextInput
          value={cohort as string} name="cohort" placeholder="Cohort"
          max={30} handleChange={handleChange}
          classNames="w-[30%] font-sans"
        />
        <p className="flex items-center gap-x-3 lg:w-[80%]">
          <TextInput
            value={firstName as string} name="firstName" placeholder="FirstName"
            max={30} handleChange={handleChange}
            classNames=""
          />
          <TextInput
            value={lastName as string} name="lastName" placeholder="LastName"
            max={20} handleChange={handleChange}
            classNames=""
          />
        </p>

        <Location location={location!} setUser={setUser} />

        <div className={`flex items-center gap-x-1 text-white lg:w-[90%]`}>
          <span className={`${theme === 'light' ? 'text-[#2c2c2c]' : 'text-[#e6e2e2]'}`}>Skills:</span>
          <TextInput
            value={skills as string} name="skills" placeholder="separate by a comma i.e dancing, cooking, bash scripting..."
            max={40} handleChange={handleChange}
            classNames=""
          />
        </div>

        <UserSocialAccounts
          setUser={setUser} socials={socials} setSocials={setSocials}
          activeAccounts={activeAccounts as UserSocialAccounts[]} theme={theme}
        />
      </div>

      <ActionButton
        checker={!loading}
        onClick={handleSubmit}
        text='Submit' disabled={loading}
        extraClassNames="w-[80%] mt-3"
        loading={loading} isError={isError}
      />

    </main>
  )
}
